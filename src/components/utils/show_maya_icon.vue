<template>
    <div>
        <img src="@/assets/maya_icons/cloud/wi-day-cloudy.svg"  class="h-12 w-12  text-mayaYellow"/>
    </div>
</template>
<script lang="ts">
import { defineComponent , watch } from 'vue'

export default defineComponent({
    name:'loadClientPosition',
    props:{
        link: {
            type: String,
            required: true
        },
    },
    setup(props) {
        watch(
            () => the_right_icon,
            (newValue, oldValue) => {

            },
            { deep: true }
        )

        return {the_right_icon,props}
    },
})
</script>