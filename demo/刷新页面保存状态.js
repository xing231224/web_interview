if(sessionStorage.getItem('store')){
  this.$store.state.replaceState(Object.assign({},
    this.$store.state,JSON.parse(sessionStorage.getItem('store'))))
}

window.addEventListener('beforeunload',()=>{
  sessionStorage.setItem('store',JSON.stringify(this.$store.state))
})