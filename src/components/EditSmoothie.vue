<template>
<div class="edit-smoothie container" v-if="smoothie">
    <h2 class="edit-smoothie">  {{smoothie.title}} smoothie</h2>

</div>
    
</template>

<script>
import db from "@/firebase/init";
export default {
    name: 'EditSmoothie',
    data(){
        return{
            smoothie: null
        }
    },
    created(){
        let ref = db.collection('smoothie').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot =>{
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            });
        })
    }

}
</script>

<style>

</style>
