import { type NextRequest, NextResponse } from "next/server"

// Implementasi algoritma Naïve Bayes sesuai jurnal
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { namaIbu, usia, tekananDarah, tfu, letakJanin } = data

    // Data training berdasarkan jurnal (165 total data)
    const trainingStats = {
      total: 165,
      normal: 97,
      berisiko: 68,

      // Probabilitas kondisional berdasarkan jurnal
      normal_conditions: {
        letak_janin_sesuai: 97 / 97, // 1.0
        tfu_sesuai: 97 / 97, // 1.0
        tekanan_darah_normal: 97 / 97, // 1.0
      },

      berisiko_conditions: {
        letak_janin_tidak_sesuai: 34 / 68, // 0.5
        tfu_tidak_sesuai: 30 / 68, // 0.441
        tekanan_darah_rendah: 17 / 68, // 0.25
        tekanan_darah_tinggi: 3 / 68, // 0.044
      },
    }

    // Hitung probabilitas prior
    const pNormal = trainingStats.normal / trainingStats.total // 0.588
    const pBerisiko = trainingStats.berisiko / trainingStats.total // 0.412

    // Hitung likelihood berdasarkan input
    let likelihoodNormal = 1.0
    let likelihoodBerisiko = 1.0

    // Letak janin
    if (letakJanin === "sesuai") {
      likelihoodNormal *= trainingStats.normal_conditions.letak_janin_sesuai
      likelihoodBerisiko *= 1 - trainingStats.berisiko_conditions.letak_janin_tidak_sesuai
    } else {
      likelihoodNormal *= 1 - trainingStats.normal_conditions.letak_janin_sesuai
      likelihoodBerisiko *= trainingStats.berisiko_conditions.letak_janin_tidak_sesuai
    }

    // TFU
    if (tfu === "sesuai") {
      likelihoodNormal *= trainingStats.normal_conditions.tfu_sesuai
      likelihoodBerisiko *= 1 - trainingStats.berisiko_conditions.tfu_tidak_sesuai
    } else {
      likelihoodNormal *= 1 - trainingStats.normal_conditions.tfu_sesuai
      likelihoodBerisiko *= trainingStats.berisiko_conditions.tfu_tidak_sesuai
    }

    // Tekanan darah
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

    // Hitung posterior probability
    const posteriorNormal = pNormal * likelihoodNormal
    const posteriorBerisiko = pBerisiko * likelihoodBerisiko

    // Normalisasi
    const total = posteriorNormal + posteriorBerisiko
    const probNormal = posteriorNormal / total
    const probBerisiko = posteriorBerisiko / total

    // Tentukan prediksi
    const prediction = probNormal > probBerisiko ? "Normal" : "Berisiko"

    // Generate rekomendasi
    let recommendation = ""
    if (prediction === "Normal") {
      recommendation =
        "Kondisi kehamilan menunjukkan kemungkinan kelahiran normal. Tetap lakukan kontrol rutin dan jaga kesehatan."
    } else {
      recommendation =
        "Kondisi kehamilan menunjukkan adanya risiko. Disarankan untuk konsultasi lebih lanjut dengan dokter spesialis dan persiapan persalinan di fasilitas kesehatan yang memadai."
    }

    return NextResponse.json({
      prediction,
      probabilities: {
        normal: probNormal,
        berisiko: probBerisiko,
      },
      calculations: {
        pNormal: posteriorNormal,
        pBerisiko: posteriorBerisiko,
      },
      recommendation,
      inputData: data,
    })
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan dalam prediksi" }, { status: 500 })
  }
}
