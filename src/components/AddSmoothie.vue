<template>

<div class="container add-smoothie">
 <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
 <form @submit.prevent="addSmoothie">
     <div class="field title">
         <label for="title"> smoothie Title</label>
         <input type="text" name="title" v-model="title" autocomplete="off">
     </div>
     <div v-for="(ing, index) in ingredients" :key="index" class="field">
         <label for="ingredient">ingredient</label>
         <input type="text" name="ingredient" v-model="ingredients[index]">
         <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
     </div>
     <div class="field add-ingredient">
         <label for="add-ingredient">Add ingredient</label>
         <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" autocomplete="off">
     </div>
     <div class="field center-align">
         <p v-if="feedback" class="red-text">{{feedback}}</p>
         <button class="btn pink">Add smoothie</button>
     </div>
 </form>
</div>
    
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
    name: 'AddSmoothie',
    data(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null

        }
    },
    methods:{
        addSmoothie(){
            if (this.title) {
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                console.log(this.slug)
                db.collection('smoothie').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
                
                this.feedback = null
                
            } else {
                this.feedback = 'You must enter value'
                
            }
            //console.log(this.title)
        },
        addIng(){
            
            if(this.another){
                this.ingredients.push(this.another)
                //console.log(this.ingredients)
                this.another = null
                this.feedback = null
            } else{
                this.feedback = 'You must enter value'
            }
        },
        deleteIng(ing){
            console.log(ing)
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })

        }
    }

}
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.add-smoothie .field{
    position: relative;
}

.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 10px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;


}

</style>
