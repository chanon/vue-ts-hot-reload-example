<style lang="scss" scoped>
	/* I always put the styling at the top, the template next, and code last */
	/* Styling at the top makes it feel like an html page with style */
	/* embedded in <head>, which is familiar. */
	/* Code block at the bottom makes it easier to find */

	.home {
		color: green;

		h1 {
			font-size: 120%;
		}
	}
</style>

<template>
	<div class="home">
		<h1>This is the home page.</h1>
		{{sayIt}}
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	// example ts module
	import saySomething from "./saySomething";

	@Component({
		components: {}
	})
	export default class Home extends Vue {
		get sayIt() {
			// try changing what saySomething returns
			return saySomething();
		}
	}
</script>