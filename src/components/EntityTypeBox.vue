<template>
    <RadioGroup class="wrapper" v-model="radio" @change="getCheck">
        <Radio v-for="entityType in entityTypes"    
            :key="entityType.name"
            class="item"
            :label="entityType.name"
        >
            {{entityType.name}}({{entityType.description}})
        </Radio>
    </RadioGroup>
</template>

<script>
import {Radio,RadioGroup} from 'element-ui';

export default {
    data(){
        return {
           radio:"鲁迅"
        }
    },
    props:{
        entityTypes:{
            type:Array,
            required:true
        },
    },
    components:{
        Radio,
        RadioGroup
    },
    methods:{
        getCheck(name){
            this.$emit("getCheckValue",name)
        }
    }
}
</script>

<style scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        border:1px solid gray;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .item{
        margin: 10px
    }
</style>
