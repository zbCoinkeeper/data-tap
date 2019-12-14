<template>
    <div class="wrapper" :class="{'word-color':word.isCheck}">
        {{word.content}}
        <input type="checkbox" 
            v-model="word.isCheck"
       />
    </div>

</template>

<script>
export default {
    props:{
        word:{
            require:true,
            type:Object
        }
    }
}
</script>

<style scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .word-color{
        color:#599ef8
    }
</style>


