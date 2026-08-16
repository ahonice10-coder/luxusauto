import { Component } from 'react'
import { Button } from '@/components/ui/button'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReload = () => {
    this.setState({ hasError: false })
    window.location.assign('/')
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">LuxusAuto</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Une erreur inattendue s’est produite</h1>
          <p className="mt-4 text-muted-foreground">Rechargez la page ou revenez à l’accueil.</p>
          <Button className="mt-8" onClick={this.handleReload}>
            Recharger
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
