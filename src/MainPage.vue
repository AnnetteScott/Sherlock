<script lang="ts">
import { defineComponent } from 'vue';

class UserData {
	cases: Case[] = [];
}

class Case {
	number = 1;
	locations = {
		"CHEMIST": {revealed: false},
		"BANK": {revealed: false},
		"CARRIAGE DEPOT": {revealed: false},
		"DOCKS": {revealed: false},
		"HOTEL": {revealed: false},
		"LOCKSMITH": {revealed: false},
		"MUSEUM": {revealed: false},
		"NEWSAGENT": {revealed: false},
		"PARK": {revealed: false},
		"PAWNBROKER": {revealed: false},
		"THEATRE": {revealed: false},
		"BOAR'S HEAD": {revealed: false},
		"SCOTLAND YARD": {revealed: false},
		"TOBACCONIST": {revealed: false},
	}
}

export default defineComponent({
	name: 'MainPage',
	data() {
		return {
			userData: {} as UserData,
			caseNum: 1,
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
		newCase(){
			const newCase = new Case();
			newCase.number = this.caseNum;

			this.userData.cases.push(newCase);
			this.update();
		}
	},
})

</script>

<template>
	<main>
		<section>
			<h1>New Case</h1>
			<form @submit="newCase()">
				<input type="number" min="1" max="75" step="1" v-model="caseNum">
				<button type="submit">Create Case</button>
			</form>
		</section>
		<section>
			<h1>Past Cases</h1>
		</section>
	</main>
</template>

<style scoped>
section {
	width: 100%;
	display: flex;
    flex-direction: column;
    align-items: center;
	gap: 10px;
}

form {
	width: 50%;
	display: flex;
    flex-direction: column;
    gap: 12px;
}

form > input {
	border-radius: 8px;
    border: 1px solid black;
	height: 25px;
}

button {
	background-color: #027be3;
	color: white;
	border: 1px solid black;
	border-radius: 8px;
	padding: 5px 20px;
}
</style>
