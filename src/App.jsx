import { AppRoutes } from './routes/AppRoutes'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SkipLink } from './components/SkipLink'

function App() {
  return (
    <ErrorBoundary>
      <SkipLink />
      <AppRoutes />
    </ErrorBoundary>
  )
}

export default App
