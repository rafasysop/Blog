function handleDelete(e, form) {
  e.preventDefault()
  
  const target = e.target[0].value <= 16
  if(target) return alert('Você não pode deletar esta categoria/artigo \n Crie um para poder deletar')
  var confirm = window.confirm('Deseja realmente Deletar?')
  if (confirm) return form.submit()
}