<script lang="ts">
import { defineComponent } from 'vue';
import caseData, { type Locations } from './cases';
import clues, { Clue } from './clues'
import info from './data'

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
	} as {[name in Locations]: {revealed: boolean}}
	answers = {} as {[letter: string]: string}
	locked = false;
}

export default defineComponent({
	name: 'MainPage',
	data() {
		return {
			caseData,
			clues,
			userData: {} as UserData,
			caseNum: 1,
			casePos: 0,
			clueNum: null as number | null,
			createNew: false,
			casePage: false,
			revealClue: false,
			incorrectClue: false,
			location: "CHEMIST" as Locations,
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
		};
		console.log(this.userData);
		console.log(clues);
		this.parseData();
	},
	methods: {
		update(){
			localStorage.setItem('userData', JSON.stringify(this.userData));
		},
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
		newCase(){
			const found = this.userData.cases.some(el => el.number === this.caseNum);
			if(found){
				return;
			}
			const newCase = new Case();
			newCase.number = this.caseNum;
			newCase.answers = caseData[this.caseNum.toString()].answers

			this.userData.cases.push(newCase);
			this.createNew = false;
			this.update();
		},
		showClue(){
			this.revealClue = false;
			if(!Object.keys(caseData).includes(this.caseNum.toString())){
				this.clueNum = null;
				return;	
			}
			const caseNum = caseData[this.caseNum.toString()].location[this.location]
			if(caseNum === this.clueNum){
				this.userData.cases[this.casePos].locations[this.location].revealed = true;
			}
			else {
				this.incorrectClue = true;
				setTimeout(() => {
					this.incorrectClue = false;
				}, 3500)
				this.clueNum = null;
				return;
			}

			this.clueNum = null;
			this.update();

			this.$nextTick(() => {
				(this.$refs[this.location] as HTMLDivElement[])[0].scrollIntoView({behavior: 'smooth'});
			})
		},
	},
})

</script>

<template>
	<template v-if="!casePage">
		<main>
			<button style="position: absolute; right: 10px; z-index: 10;" @click="createNew = !createNew">+</button>
			<section v-if="createNew">
				<h1>Add Case</h1>
				<form @submit.prevent="newCase()">
					<input type="number" min="1" max="75" step="1" v-model="caseNum">
					<button type="submit">Create Case</button>
					<button @click.prevent="createNew = false">Cancel</button>
				</form>
			</section>
			<section v-if="!createNew">
				<h1>Cases</h1>
				<div class="case_item" 
					v-for="item, index of userData.cases" :key="item.number"
					@click="casePos = index, casePage = true;"
				>
					<h2>Case: {{ item.number }}</h2>
					<span class="material-symbols-rounded" v-if="item.locked">lock</span>
				</div>
			</section>
		</main>
	</template>

	<template v-if="casePage">
		<main>
			<p id="incorrectClue" v-if="incorrectClue">Incorrect Clue Number</p>
			<h1>Case: {{ caseNum }}</h1>
			<template v-if="!revealClue">
				<div class="location_item" :ref="site"
					v-for="[site, info] of Object.entries(userData.cases[casePos].locations)" 
					:key="site"
					@click="!info.revealed ? (revealClue = true, location = site as Locations): ''"
				>
					<div>
						<span class="material-symbols-rounded" v-if="!info.revealed">lock</span>
						<h2>{{ site }}</h2>
					</div>
					<span v-if="info.revealed">
						{{ clues[caseData[caseNum.toString()].location[site as Locations]].type }}
						{{ clues[caseData[caseNum.toString()].location[site as Locations]].partTotal }}
					</span>
					<p v-if="info.revealed">
						{{ clues[caseData[caseNum.toString()].location[site as Locations]].message }}
					</p>
				</div>
			</template>

			<form @submit.prevent="showClue()" class="on_top" v-if="revealClue">
				<div class="inner">
					<label for="Clue Number">
						Enter clue number for {{ location }}
					</label>
					<input type="number" min="1" max="1050" step="1" v-model="clueNum">
					<button type="submit">Reveal Clue</button>
					<button @click.prevent="revealClue = false" >Cancel</button>
				</div>
			</form>
		</main>
	</template>
</template>

<style scoped>
section {
	width: 100%;
	height: 100%;
	display: flex;
    flex-direction: column;
    align-items: center;
	gap: 1.2rem;
	z-index: 1;
}

form {
	width: 100%;
	padding: 30px 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: center;
    gap: 12px;
}

form > .inner {
	width: 70%;
	display: flex;
    flex-direction: column;
    gap: 30px;
}

form input {
	border-radius: 8px;
    border: 1px solid black;
	height: 2.8rem;
	font-size: 1.2rem;
}

button {
	background-color: #027be3;
	color: white;
	border: 1px solid black;
	border-radius: 8px;
	padding: 5px 20px;
	height: 2.8rem;
	font-size: 1.2rem;
}

label {
	font-size: 1.2rem;
}

.on_top{
	position: absolute;
}

.case_item {
	width: 100%;
	border: 1px solid black;
	border-radius: 8px;
	padding: 2px 10px;
	display: flex;
	align-items: center;
    justify-content: space-between;
}

#incorrectClue {
	position: fixed;
	top: 10px;
	background-color: #FF6B6B;
	padding: 10px 20px;
	border-radius: 8px;
	z-index: 10;
	font-size: 1.2rem;
}

.location_item{
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 5px 0px;
}

.location_item > div{
	display: flex;
	align-items: center;
    gap: 10px;
}
</style>
