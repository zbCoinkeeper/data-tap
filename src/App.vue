<template>
  <div id="app-wrapper">
    <div id="app">
      <div class="content" style="margin-right:100px">
        <SingWord v-for="word in words" :key="word.id" :word="word" />
      </div>
      <div class="content">
        <GroupBox :entityTypes="entityTypesArr1" @getCheckValue="getCheckValue1" />
      </div>
      <div class="content">
        <GroupBox :entityTypes="entityTypesArr2" @getCheckValue="getCheckValue2" />
      </div>
      <div class="content">
        <GroupBox :entityTypes="relationShipArr" @getCheckValue="getCheckValue3" />
      </div>
    </div>
    <div class="action" style="margin-top:50px">
      <Button type="primary" @click="submit">提交</Button>
      <Button type="warning" @click="useless">该数据无法标注</Button>
      <Input v-model="name" placeholder="请输入姓名" style="width:100px;margin-left:100px" />
    </div>
  </div>
</template>

<script>
import GroupBox from "./components/EntityTypeBox.vue";
import SingWord from "./components/SingWord.vue";
import { Button, Input } from "element-ui";

export default {
  name: "app",
  components: {
    GroupBox,
    SingWord,
    Button,
    Input
  },

  data() {
    return {
      entityTypesArr1: [],
      entityTypesArr2: [],
      relationShipArr: [],
      words: [],
      name: ""
    };
  },
  mounted() {
    this.axios
      .get("/raw/types", {
        params: {
          param: "body"
        }
      })
      .then(res => {
        this.entityTypesArr1 = res.data.data;
        this.entityTypesArr2 = res.data.data;
      });

    this.axios
      .get("/raw/types", {
        params: {
          param: "relation"
        }
      })
      .then(res => {
        this.relationShipArr = res.data.data;
      });
    this.getSen();
  },
  methods: {
    getSen() {
      this.axios
        .post("/raw/getSentence", {
          novel: false,
          userName: this.name
        })
        .then(res => {
          let sentence = res.data.data.rawSentence.sentence;
          this.sentence = sentence;
          this.id = res.data.data.rawSentence.id;
          this.version = res.data.data.rawSentence.version;
          console.log(sentence);
          let words = sentence.split("");
          let wordObject = words.map((item, index) => {
            return {
              content: item,
              id: index,
              isCheck: false
            };
          });
          this.words = wordObject;
        });
    },
    submit() {
     let num = 0;
      let wordId = [];
      this.words.forEach(item => {
        if (item.isCheck) {
          num++;
          wordId.push(item.id);
        }
      });
      if (num > 4) {
        alert("超出可以选择的实体数量，只能选择2个实体，请重新选择");
        return;
      }
      if (num < 4) {
        alert("必须选择2个实体，请重新选择");
        return;
      }

      if (!this.name) {
        alert("必须填写姓名");
        return;
      }
       if ((!this.name1)||(!this.name2)||(!this.relation)) {
        alert("必须选择实体类型以及关系");
        return;
      }
      wordId.sort(((a,b)=>{
        return a-b
      }));
      console.log(wordId)
      let that = this;
      this.axios
        .post("/raw/add", {
          headEnd: wordId[1],
          headOffset: wordId[0],
          headType: that.name1,
          rawSentence: {
            flag: "LABELED",
            id: that.id,
            sentence: that.sentence,
            userName: that.name,
            version: that.version
          },
          relation: that.relation,
          tailEnd: wordId[3],
          tailOffset: wordId[2],
          tailType: that.name2,
          userIp: "string",
          userName: that.name
        })
        .then(res => {
          alert("提交成功")
          console.log(res);
          this.getSen();
        }).catch((err)=>{
          alert(err)
        });
    },
    useless(){
      let that = this;
      this.axios
        .post("/raw/add", {
          headEnd: 0,
          headOffset: 0,
          headType: that.name1,
          rawSentence: {
            flag: "USELESS",
            id: that.id,
            sentence: that.sentence,
            userName: that.name,
            version: that.version
          },
          relation: that.relation,
          tailEnd: 0,
          tailOffset: 0,
          tailType: that.name2,
          userIp: "string",
          userName: that.name
        })
        .then(res => {
          console.log(res);
          this.getSen();
        }).catch((err)=>{
          alert(err)
        });
    },
    getCheckValue1(name) {
      this.name1 = name;
    },
    getCheckValue2(name) {
      this.name2 = name;
    },
    getCheckValue3(name) {
      this.relation = name;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

.content {
  flex-basis: 300px;
  display: flex;
  justify-content:flex-start;
  align-items: center;
  width: 300px;
  flex-wrap: wrap;
}

.action{
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>
