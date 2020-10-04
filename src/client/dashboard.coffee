socket = null
ports = null
currentOutput = null

render = ->
  if not ports?
    document.getElementById("main").innerHTML = "is the matrix on?"
    return

  html = ""
  html += """
    <div class="header">#{ports.title}</div>
    """

  html += """
    <div class="row">
    <div class="column">
    <div class="smallheader">Output</div>
    """

  currentInput = 0
  for port in ports.outputs
    otherClasses = ""
    if port.id == currentOutput
      otherClasses += " selectedbutton"
      currentInput = port.input
    html += """
      <div class="button outputbutton#{otherClasses}" onclick="setOutput(#{port.id})">#{port.name}</div>
    """

  html += """
    </div>
    <div class="column">
    <div class="smallheader">Input</div>
  """

  for port in ports.inputs
    otherClasses = ""
    if port.id == currentInput
      otherClasses += " selectedbutton"
    html += """
      <div class="button inputbutton#{otherClasses}" onclick="setInput(#{port.id})">#{port.name}</div>
    """

  html += """
    </div>
    </div>
  """
  document.getElementById("main").innerHTML = html

setOutput = (id) ->
  defaultOutput = null
  currentOutput = null
  for port in ports.outputs
    if port.default
      defaultOutput = port.id
    if port.id == id
      currentOutput = id
      break
  if not currentOutput?
    currentOutput = defaultOutput
  render()

setInput = (id) ->
  if not currentOutput?
    return

  console.log "setting #{currentOutput} -> #{id}"
  socket.emit 'set', {
    output: currentOutput
    input: id
  }

init = ->
  window.setInput = setInput
  window.setOutput = setOutput

  socket = io()
  socket.on 'refresh', (portsPkt) ->
    console.log "PKT: ", portsPkt
    ports = portsPkt
    if not currentOutput?
      for port in ports.outputs
        if port.default
          currentOutput = port.id
    render()

window.onload = init
