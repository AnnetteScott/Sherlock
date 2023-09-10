<script setup lang="ts">
import MainPage from './MainPage.vue'
</script>

<template>
	<MainPage />
</template>

<style>
*,
*::before,
*::after {
	position: relative;
	box-sizing: border-box !important;
	margin: 0;
	font-weight: normal;
}

html {
	background-repeat: no-repeat;
	overflow: hidden;
	height: 100vh;
}

body {
    margin: 0px;
    min-height: 100vh;
	height: 100vh;
	color: black;
	line-height: 1.6;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: #ffffff;
	transition: color 0.5s, background-color 0.5s;
	display: flex;
	flex-direction: column;
    align-items: flex-end;
	overflow: hidden;
}

main{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	flex-grow: 1;
	gap: 1rem;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	position: fixed;
	padding: 10px;
}
</style>
