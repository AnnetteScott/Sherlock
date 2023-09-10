<script lang="ts">
import { defineComponent } from 'vue';
import info from './data';
import { Clue, ClueType } from './clues'

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
		//this.parseData();
	},
	methods: {
		update(){
			localStorage.setItem('userData', JSON.stringify(this.userData));
		},
		parseData(){
			const lines = info.split('\n');

			const clues = {} as {[num: number]: Clue}

			let clueNum = 1;
			let clueType = "" as ClueType
			let partTotal = 0;
			let clueMessage = "No Clue."


			for(const lineInfo of lines){
				const line = lineInfo.trim();
				if(line === ''){
					continue;
				}

				// Start of clue
				if(!(/^(1[0-9]{0,2}|[1-9][0-9]?|1050)/.test(line))){
					clueMessage += line + '\n'
					continue;
				}

				//console.log(line);
					
				//Save Previous Clue
				let clue = new Clue();
				clue.type = clueType;
				clue.message = clueMessage;
				clue.partTotal = partTotal;
				clues[clueNum] = clue;

				//Clear
				clueNum = 1;
				clueType = ""
				partTotal = 0;
				clueMessage = ""

				//parse current clue num
				const split = line.split("CLUE");
				clueNum = parseInt(split[0]);

				if(line.includes("CLUE (")){
					clueType = split[0].substring(split[0].indexOf(" ")).trim() as ClueType;
					let length = (split[1].trim()).split(" ")[0];
					partTotal = this.getLength(length.substring(1));
				}
				else {
					clueMessage = line.substring(line.indexOf(' '));
				}

			}

			//Save last Clue
			let clue = new Clue();
			clue.type = clueType;
			clue.message = clueMessage;
			clue.partTotal = partTotal;
			clues[clueNum] = clue;

			console.log(JSON.stringify(clues));

		},
		getLength(length: string){
			let num = 0;
			length == 'One' ? num = 1 : 0;
			length == 'Two' ? num = 2 : 0;
			length == 'Three' ? num = 3 : 0;
			length == 'Four' ? num = 4 : 0;
			length == 'Five' ? num = 5 : 0;
			length == 'Six' ? num = 6 : 0;
			length == 'Seven' ? num = 7 : 0;
			length == 'Eight' ? num = 8 : 0;
			length == 'Nine' ? num = 9 : 0;

			return num;
		}
	},
})

</script>

<template>
	<main>

	</main>
</template>

<style scoped>

</style>
