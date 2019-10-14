<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
    import jwt_decode from 'jwt-decode'
    export default {
        name: 'app',
        created() {
            let token = localStorage.eleToken;
            if(token) {
                let decode = jwt_decode(token);
                this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
                this.$store.dispatch('setUser',decode);
                // console.log(this.$store.state.isAuthenticated)
                // console.log(this.$store.state.user)
                // console.log('---------')
            }
        },
        methods: {
            //校验返回数据 类型 true false
            isEmpty(value) {
                return(
                    value === undefined
                    || value === null
                    || (typeof value === "object" && Object.keys(value).length === 0)
                    || (typeof value === "string" && value.trim().length === 0)
                )
            }
        },
        components: {}
    }
</script>

<style lang="stylus">
html
body
#app
  width 100%
  height 100%


</style>
