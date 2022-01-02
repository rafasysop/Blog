function handleDelete(e, form) {
  e.preventDefault()
  var confirm = window.confirm('Deseja realmente Deletar?')
  if (confirm) return form.submit()
}