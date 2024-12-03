export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-500">404</h1>
                <p className="text-lg font-medium text-gray-500 mt-4">The page you are looking for has not been found.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 px-6 py-3 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition font-medium"
                >
                    Return to the home page
                </button>
            </div>
        </div>
    )
}