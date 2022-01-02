function handleDelete(e, form) {
  e.preventDefault()
  var confirm = window.confirm('Deseja Deletar esta Categoria?')
  if (confirm) return form.submit()
}