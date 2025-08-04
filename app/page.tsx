"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Baby, Brain, BarChart3, Upload, Download, Activity, TrendingUp, FileText, Database, LogIn } from "lucide-react"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [stats, setStats] = useState({
    totalPredictions: 0,
    normalPredictions: 0,
    riskPredictions: 0,
    accuracy: 92.73,
  })

  useEffect(() => {
    // Load stats from localStorage or API
    const savedStats = localStorage.getItem("predictionStats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in real app, this would be server-side
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsLoggedIn(true)
      setUserRole("admin")
    } else if (loginForm.username === "user" && loginForm.password === "user123") {
      setIsLoggedIn(true)
      setUserRole("user")
    } else {
      alert("Username atau password salah!")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setLoginForm({ username: "", password: "" })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Baby className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Sistem Prediksi Kelahiran Bayi</CardTitle>
            <CardDescription>Masuk untuk mengakses sistem prediksi menggunakan algoritma Naïve Bayes</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Masukkan username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Masukkan password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Demo Akun:</h4>
              <div className="text-xs space-y-1">
                <div>
                  <strong>Admin:</strong> admin / admin123
                </div>
                <div>
                  <strong>User:</strong> user / user123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Baby className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistem Prediksi Kelahiran Bayi</h1>
                <p className="text-sm text-gray-500">Menggunakan Algoritma Naïve Bayes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {userRole}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Prediksi</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPredictions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Kelahiran Normal</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.normalPredictions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Alert className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Kelahiran Berisiko</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.riskPredictions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Akurasi Model</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="predict">Prediksi</TabsTrigger>
            <TabsTrigger value="batch">Input Batch</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Sistem</CardTitle>
                  <CardDescription>Informasi tentang sistem prediksi kelahiran bayi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Akurasi Model</span>
                    <span className="text-sm text-gray-600">{stats.accuracy}%</span>
                  </div>
                  <Progress value={stats.accuracy} className="w-full" />

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Precision:</span>
                      <span className="font-medium">83.33%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recall:</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AUC:</span>
                      <span className="font-medium">0.991</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Algoritma Naïve Bayes</CardTitle>
                  <CardDescription>Metode klasifikasi yang digunakan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        Sistem menggunakan algoritma Naïve Bayes untuk mengklasifikasi kondisi kelahiran berdasarkan
                        data: usia ibu, tekanan darah, TFU, dan letak janin.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Normal</div>
                        <div className="text-green-600">Kelahiran tanpa komplikasi</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="font-medium text-red-800">Berisiko</div>
                        <div className="text-red-600">Memerlukan perhatian khusus</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predict">
            <PredictionForm
              onPredictionComplete={(result) => {
                setStats((prev) => ({
                  ...prev,
                  totalPredictions: prev.totalPredictions + 1,
                  normalPredictions:
                    result.prediction === "Normal" ? prev.normalPredictions + 1 : prev.normalPredictions,
                  riskPredictions: result.prediction === "Berisiko" ? prev.riskPredictions + 1 : prev.riskPredictions,
                }))
              }}
            />
          </TabsContent>

          <TabsContent value="batch">
            <BatchInputForm />
          </TabsContent>

          <TabsContent value="training">
            <TrainingSection />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>

          <TabsContent value="data">
            <DataManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Prediction Form Component
function PredictionForm({ onPredictionComplete }: { onPredictionComplete: (result: any) => void }) {
  const [formData, setFormData] = useState({
    namaIbu: "",
    usia: "",
    tekananDarah: "",
    tfu: "",
    letakJanin: "",
  })
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const predictionResult = await response.json()
      setResult(predictionResult)
      onPredictionComplete(predictionResult)

      // Save to localStorage
      const predictions = JSON.parse(localStorage.getItem("predictions") || "[]")
      predictions.push({
        ...formData,
        ...predictionResult,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("predictions", JSON.stringify(predictions))
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Input Data Ibu Hamil</CardTitle>
          <CardDescription>Masukkan data untuk prediksi kondisi kelahiran</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="namaIbu">Nama Ibu</Label>
              <Input
                id="namaIbu"
                value={formData.namaIbu}
                onChange={(e) => setFormData((prev) => ({ ...prev, namaIbu: e.target.value }))}
                placeholder="Masukkan nama ibu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usia">Usia Ibu</Label>
              <Input
                id="usia"
                type="number"
                value={formData.usia}
                onChange={(e) => setFormData((prev) => ({ ...prev, usia: e.target.value }))}
                placeholder="Masukkan usia (tahun)"
                min="15"
                max="50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tekananDarah">Tekanan Darah</Label>
              <select
                id="tekananDarah"
                value={formData.tekananDarah}
                onChange={(e) => setFormData((prev) => ({ ...prev, tekananDarah: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih tekanan darah</option>
                <option value="rendah">Rendah (&lt; 90/60 mmHg)</option>
                <option value="normal">Normal (90/60 - 140/90 mmHg)</option>
                <option value="tinggi">Tinggi (&gt; 140/90 mmHg)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tfu">Tinggi Fundus Uterus (TFU)</Label>
              <select
                id="tfu"
                value={formData.tfu}
                onChange={(e) => setFormData((prev) => ({ ...prev, tfu: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih kondisi TFU</option>
                <option value="sesuai">Sesuai dengan usia kehamilan</option>
                <option value="tidak_sesuai">Tidak sesuai dengan usia kehamilan</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="letakJanin">Letak Janin</Label>
              <select
                id="letakJanin"
                value={formData.letakJanin}
                onChange={(e) => setFormData((prev) => ({ ...prev, letakJanin: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih letak janin</option>
                <option value="sesuai">Sesuai (Vertex/Kepala di bawah)</option>
                <option value="tidak_sesuai">Tidak sesuai (Breech/Sungsang)</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Prediksi Kondisi Kelahiran"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Hasil Prediksi</CardTitle>
            <CardDescription>Berdasarkan algoritma Naïve Bayes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${
                    result.prediction === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.prediction === "Normal" ? "✓" : "⚠"} {result.prediction}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Probabilitas Normal:</span>
                  <span className="text-green-600 font-mono">{(result.probabilities.normal * 100).toFixed(2)}%</span>
                </div>
                <Progress value={result.probabilities.normal * 100} className="w-full" />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Probabilitas Berisiko:</span>
                  <span className="text-red-600 font-mono">{(result.probabilities.berisiko * 100).toFixed(2)}%</span>
                </div>
                <Progress value={result.probabilities.berisiko * 100} className="w-full" />
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Rekomendasi:</strong> {result.recommendation}
                </AlertDescription>
              </Alert>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Detail Perhitungan:</h4>
                <div className="text-sm space-y-1 font-mono bg-gray-50 p-3 rounded">
                  <div>P(Normal) = {result.calculations.pNormal.toFixed(4)}</div>
                  <div>P(Berisiko) = {result.calculations.pBerisiko.toFixed(4)}</div>
                  <div className="pt-2 border-t">
                    <div>Hasil: {result.prediction}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Batch Input Form Component
function BatchInputForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const processFile = async () => {
    if (!file) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/batch-predict", {
        method: "POST",
        body: formData,
      })

      const batchResults = await response.json()
      setResults(batchResults)
    } catch (error) {
      console.error("Error processing file:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadTemplate = () => {
    const csvContent = "nama_ibu,usia,tekanan_darah,tfu,letak_janin\nContoh Ibu,25,normal,sesuai,sesuai\n"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "template_data_ibu_hamil.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Data Batch</CardTitle>
          <CardDescription>Upload file Excel atau CSV untuk prediksi batch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="flex items-center space-x-3">
              <Upload className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium">{file ? file.name : "Pilih file CSV atau Excel"}</p>
                <p className="text-xs text-gray-500">Format: CSV, Excel (.xlsx)</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Template
              </Button>
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Pilih File
                </label>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {file && (
            <Button onClick={processFile} disabled={isProcessing} className="w-full">
              {isProcessing ? "Memproses..." : "Proses Data Batch"}
            </Button>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hasil Prediksi Batch</CardTitle>
            <CardDescription>{results.length} data telah diproses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nama</th>
                    <th className="text-left p-2">Usia</th>
                    <th className="text-left p-2">Prediksi</th>
                    <th className="text-left p-2">Probabilitas</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{result.namaIbu}</td>
                      <td className="p-2">{result.usia}</td>
                      <td className="p-2">
                        <Badge variant={result.prediction === "Normal" ? "default" : "destructive"}>
                          {result.prediction}
                        </Badge>
                      </td>
                      <td className="p-2 font-mono text-xs">
                        {(Math.max(result.probabilities.normal, result.probabilities.berisiko) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Training Section Component
function TrainingSection() {
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [modelMetrics, setModelMetrics] = useState({
    accuracy: 92.73,
    precision: 83.33,
    recall: 100,
    auc: 0.991,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Model</CardTitle>
          <CardDescription>Latih model menggunakan data training dengan 10-fold cross validation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              Model saat ini telah dilatih dengan 110 data training dan diuji dengan 55 data testing sesuai dengan
              penelitian dalam jurnal.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{modelMetrics.accuracy}%</div>
              <div className="text-sm text-blue-800">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{modelMetrics.precision}%</div>
              <div className="text-sm text-green-800">Precision</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{modelMetrics.recall}%</div>
              <div className="text-sm text-purple-800">Recall</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{modelMetrics.auc}</div>
              <div className="text-sm text-orange-800">AUC</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status Model</Label>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-800 font-medium">Model Aktif - Excellent Classification</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                AUC = 0.991 menunjukkan performa klasifikasi yang sangat baik
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Hasil evaluasi model dengan cross validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 max-w-md">
            <div></div>
            <div className="text-center font-medium text-sm">Prediksi Normal</div>
            <div className="text-center font-medium text-sm">Prediksi Berisiko</div>

            <div className="font-medium text-sm">Aktual Normal</div>
            <div className="bg-green-100 text-center p-3 rounded font-bold text-green-800">31</div>
            <div className="bg-red-100 text-center p-3 rounded font-bold text-red-800">0</div>

            <div className="font-medium text-sm">Aktual Berisiko</div>
            <div className="bg-red-100 text-center p-3 rounded font-bold text-red-800">4</div>
            <div className="bg-green-100 text-center p-3 rounded font-bold text-green-800">20</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Reports Section Component
function ReportsSection() {
  const [predictions] = useState(() => {
    return JSON.parse(localStorage.getItem("predictions") || "[]")
  })

  const exportToPDF = () => {
    // In a real app, this would generate a proper PDF
    alert("Fitur export PDF akan diimplementasikan dengan library PDF generator")
  }

  const exportToExcel = () => {
    // In a real app, this would generate a proper Excel file
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Nama,Usia,Tekanan Darah,TFU,Letak Janin,Prediksi,Probabilitas,Tanggal\n" +
      predictions
        .map(
          (p: any) =>
            `${p.namaIbu},${p.usia},${p.tekananDarah},${p.tfu},${p.letakJanin},${p.prediction},${(Math.max(p.probabilities.normal, p.probabilities.berisiko) * 100).toFixed(2)}%,${new Date(p.timestamp).toLocaleDateString()}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "laporan_prediksi.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Laporan Prediksi</CardTitle>
          <CardDescription>Ringkasan hasil prediksi dan analisis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <Button onClick={exportToPDF} variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={exportToExcel} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>

          {predictions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Tanggal</th>
                    <th className="text-left p-2">Nama</th>
                    <th className="text-left p-2">Usia</th>
                    <th className="text-left p-2">Prediksi</th>
                    <th className="text-left p-2">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.slice(-10).map((prediction: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{new Date(prediction.timestamp).toLocaleDateString()}</td>
                      <td className="p-2">{prediction.namaIbu}</td>
                      <td className="p-2">{prediction.usia}</td>
                      <td className="p-2">
                        <Badge variant={prediction.prediction === "Normal" ? "default" : "destructive"}>
                          {prediction.prediction}
                        </Badge>
                      </td>
                      <td className="p-2 font-mono">
                        {(Math.max(prediction.probabilities.normal, prediction.probabilities.berisiko) * 100).toFixed(
                          1,
                        )}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Belum ada data prediksi</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Data Management Component
function DataManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Data</CardTitle>
          <CardDescription>Kelola data training dan testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Data Training</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Total Data Training</span>
                  <Badge>110 data</Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Data Normal</span>
                  <span className="text-sm text-green-600">74 data</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Berisiko</span>
                  <span className="text-sm text-red-600">36 data</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Data Testing</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Total Data Testing</span>
                  <Badge>55 data</Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Data Normal</span>
                  <span className="text-sm text-green-600">35 data</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Berisiko</span>
                  <span className="text-sm text-red-600">20 data</span>
                </div>
              </div>
            </div>
          </div>

          <Alert className="mt-6">
            <Database className="h-4 w-4" />
            <AlertDescription>
              Data menggunakan format sesuai dengan penelitian: 165 total data (110 training + 55 testing) dengan
              atribut usia, tekanan darah, TFU, dan letak janin.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
