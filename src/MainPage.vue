<script lang="ts">
import { defineComponent } from 'vue';

class UserData {
	cases: Case[] = [];
}

class Case {
	number = 1;
}

export default defineComponent({
	name: 'MainPage',
	data() {
		return {
			userData: {} as UserData,
		};
	},
	mounted(){
		const data = localStorage.getItem('userData');
		if(!data){
			this.userData = new UserData();
			this.update();
		}
		else {
			this.userData = JSON.parse(data)
		}
		this.userData = new UserData();
		this.update();

		console.log(this.userData);
	},
	methods: {
		update(){
			localStorage.setItem('userData', JSON.stringify(this.userData));
		},
	},
})

</script>

<template>
	<main>

	</main>
</template>

<style scoped>

</style>
