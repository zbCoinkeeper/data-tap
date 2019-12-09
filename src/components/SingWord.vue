<template>
    <div class="wrapper">
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
</style>


