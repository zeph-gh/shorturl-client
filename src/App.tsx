import { useState, type FormEvent } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setShortUrl('')

    try {
      const response = await axios.post('http://localhost:3000/api/shorten', {
        url,
      })
      setShortUrl(response.data.shortUrl)
      toast.success('URL shortened successfully!')
    } catch (err) {
      toast.error('Failed to shorten URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-center w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://example.com"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-gray-700">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  )
}

export default App
