<script lang="ts">
import { defineComponent } from 'vue';
import clues, { Clue } from './clues'
import info from './data'


export default defineComponent({
	name: 'MainPage',
	data() {
		return {
			clues,
			clueNum: null as number | null,
			view: false,
			timeLeft: '',
			viewTime: 30,
			interval: 0,
			timeOut: 0
		};
	},
	mounted(){
		window.addEventListener('popstate', () => {
			this.clear();
		})
	},
	methods: {
		parseData(){
			const lines = info.split('\n');

			const clues = {} as {[num: number]: Clue}

			let clueNum = 1;
			let clueType = ""
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
				clueNum = parseInt(line.split(" ")[0]);

				if(line.includes("Parts)")){
					const split = line.split("(")
					clueType = split[0].substring(split[0].indexOf(" ")).trim();
					let length = (split[1].trim()).split(" ")[0];
					partTotal = this.getLength(length);
				}
				else if(line.includes("CLUE") && clueNum != 286){
					const split = line.split(" ")
					split.shift();
					console.log(split)
					clueType = split.join(" ").trim();
					console.log(clueType)
				}
				else {
					clueMessage = line.substring(line.indexOf(' ')).trim();
				}

			}

			//Save last Clue
			let clue = new Clue();
			clue.type = clueType;
			clue.message = clueMessage;
			clue.partTotal = partTotal;
			clues[clueNum] = clue;

			console.log(JSON.stringify(clues, undefined, 4));

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
		},
		viewClue(){
			if(this.clueNum === null){
				return;
			}
			let length = Math.max(parseInt(((clues[this.clueNum].message.length - 40) / 10).toString()), 0)
			this.viewTime = Math.min(30 + length, 60)

			this.view = true;
			this.startTimer();
			console.log()
			this.timeOut = setTimeout(() => {
				this.clear()
			}, this.viewTime * 1000)
			
		},
		startTimer() {
			let timer = this.viewTime - 1, minutes, seconds;
			this.interval = setInterval(() => {
				minutes = parseInt((timer / 60).toString(), 10);
				seconds = parseInt((timer % 60).toString(), 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				this.timeLeft = minutes + ":" + seconds;

				if (--timer < 0) {
					timer = 43;
				}
			}, 1000);
		},
		clear(){
			this.clueNum = null
			this.view = false
			this.timeLeft = ''
			clearInterval(this.interval);
			clearTimeout(this.timeOut);
		}
	},
	watch: {
		view(){
			if(this.view){
				window.history.pushState(undefined, '', 'clue');
			}
		}
	}
})

</script>

<template>
	<section v-if="!view" id="input_page">
		<form @submit.prevent="viewClue()">
			<input type="number" min="1" max="1050" v-model="clueNum" required >
			<button type="submit">View Clue</button>
		</form>
	</section>
	<section v-if="view && clueNum != null" id="clue_view">
		<p>{{ timeLeft }}</p>
		<button @click="clear()"
			style="position: absolute; left: 0px; top: 5px; font-size: 1rem;" 
		>Back</button>
		<div>
			<p>
				<span v-if=" clues[clueNum].type != ''">{{ clues[clueNum].type }}</span>
				<span v-if="clues[clueNum].partTotal != 0"> ({{ clues[clueNum].partTotal }} Parts)</span>
			</p>
			<p v-if="clues[clueNum].partTotal != 0" style="text-align: center;">
				<span id="message_part">{{ clues[clueNum].message.split(" ")[0] }}</span>&nbsp;
				<span>{{ clues[clueNum].message.substring(clues[clueNum].message.indexOf(" ") + 1) }}</span>
			</p>
			<p v-if="clues[clueNum].partTotal === 0" style="text-align: center;">{{ clues[clueNum].message }}</p>
		</div>
		<p>&nbsp;</p>
	</section>
</template>

<style scoped>
#input_page{
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 40px;
}

#clue_view{
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

#clue_view > div{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
}

form {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 40px;
}

input {
	height: 40px;
	font-size: 1.5rem;
	border-radius: 8px;
	border: 1px solid black;
}

button{
	font-size: 1.5rem;
	padding: 5px 10px;
	border-radius: 8px;
	border: 1px solid black;
	background-color: #027be3;
	color: white;
}

#message_part {
	font-family: 'Manrope', sans-serif;
	font-family: 'Noto Sans Sogdian', sans-serif;
}
</style>
