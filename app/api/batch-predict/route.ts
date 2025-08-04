import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const text = await file.text()
    const lines = text.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim())

    const results = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim())

      if (values.length >= 5) {
        const rowData = {
          namaIbu: values[0],
          usia: values[1],
          tekananDarah: values[2],
          tfu: values[3],
          letakJanin: values[4],
        }

        // Call prediction logic (same as single prediction)
        const prediction = await predictSingle(rowData)
        results.push({
          ...rowData,
          ...prediction,
        })
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Batch prediction error:", error)
    return NextResponse.json({ error: "Error processing batch file" }, { status: 500 })
  }
}

// Helper function for single prediction (extracted from predict route)
async function predictSingle(data: any) {
  const { tekananDarah, tfu, letakJanin } = data

  const trainingStats = {
    total: 165,
    normal: 97,
    berisiko: 68,
    normal_conditions: {
      letak_janin_sesuai: 1.0,
      tfu_sesuai: 1.0,
      tekanan_darah_normal: 1.0,
    },
    berisiko_conditions: {
      letak_janin_tidak_sesuai: 0.5,
      tfu_tidak_sesuai: 0.441,
      tekanan_darah_rendah: 0.25,
      tekanan_darah_tinggi: 0.044,
    },
  }

  const pNormal = trainingStats.normal / trainingStats.total
  const pBerisiko = trainingStats.berisiko / trainingStats.total

  let likelihoodNormal = 1.0
  let likelihoodBerisiko = 1.0

  // Apply same logic as single prediction
  if (letakJanin === "sesuai") {
    likelihoodNormal *= trainingStats.normal_conditions.letak_janin_sesuai
    likelihoodBerisiko *= 1 - trainingStats.berisiko_conditions.letak_janin_tidak_sesuai
  } else {
    likelihoodNormal *= 1 - trainingStats.normal_conditions.letak_janin_sesuai
    likelihoodBerisiko *= trainingStats.berisiko_conditions.letak_janin_tidak_sesuai
  }

  if (tfu === "sesuai") {
    likelihoodNormal *= trainingStats.normal_conditions.tfu_sesuai
    likelihoodBerisiko *= 1 - trainingStats.berisiko_conditions.tfu_tidak_sesuai
  } else {
    likelihoodNormal *= 1 - trainingStats.normal_conditions.tfu_sesuai
    likelihoodBerisiko *= trainingStats.berisiko_conditions.tfu_tidak_sesuai
  }

  if (tekananDarah === "normal") {
    likelihoodNormal *= trainingStats.normal_conditions.tekanan_darah_normal
    likelihoodBerisiko *=
      1 -
      trainingStats.berisiko_conditions.tekanan_darah_rendah -
      trainingStats.berisiko_conditions.tekanan_darah_tinggi
  } else if (tekananDarah === "rendah") {
    likelihoodNormal *= 1 - trainingStats.normal_conditions.tekanan_darah_normal
    likelihoodBerisiko *= trainingStats.berisiko_conditions.tekanan_darah_rendah
  } else if (tekananDarah === "tinggi") {
    likelihoodNormal *= 1 - trainingStats.normal_conditions.tekanan_darah_normal
    likelihoodBerisiko *= trainingStats.berisiko_conditions.tekanan_darah_tinggi
  }

  const posteriorNormal = pNormal * likelihoodNormal
  const posteriorBerisiko = pBerisiko * likelihoodBerisiko

  const total = posteriorNormal + posteriorBerisiko
  const probNormal = posteriorNormal / total
  const probBerisiko = posteriorBerisiko / total

  const prediction = probNormal > probBerisiko ? "Normal" : "Berisiko"

  return {
    prediction,
    probabilities: {
      normal: probNormal,
      berisiko: probBerisiko,
    },
  }
}
