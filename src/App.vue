<style lang="scss">
	/* I always put the styling at the top, the template next, and code last */
	/* Styling at the top makes it feel like an html page with style */
	/* embedded in <head>, which is familiar. */
	/* Code block at the bottom makes it easier to find */
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	#nav {
		padding: 30px;
		a {
			font-weight: bold;
			color: #2c3e50;
			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>

<template>
	<div id="app">
    	<div id="nav">
			<router-link to="/">Home</router-link> |
       		<router-link to="/about">About</router-link>
    	</div>
    	<router-view/>
	</div>
</template>