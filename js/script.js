function valueInput() {
  timeAzul.value = 0
  timeVermelho.value = 0
  setsAzul.value = 0
  setsVermelho.value = 0
}

function addPoint(idTime, idSets, idAdv) {
  const time = document.getElementById(idTime)
  const sets = document.getElementById(idSets)
  const adv = document.getElementById(idAdv)

  time.value = Number(time.value) + 1

  const pontosTime = Number(time.value)
  const pontosAdv = Number(adv.value)
  const totalSets = Number(setsAzul.value) + Number(setsVermelho.value)

  const limite = totalSets === 2 ? 15 : 15 // 5º set

  if (
    pontosTime >= limite &&
    pontosTime - pontosAdv >= 2
  ) {
    sets.value = Number(sets.value) + 1

    // resetar pontos
    timeAzul.value = 0
    timeVermelho.value = 0
  }
}

function removePoint(idTime) {
  const time = document.getElementById(idTime)
  time.value = Math.max(0, Number(time.value) - 1)
}