import { createRoot } from 'react-dom/client'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'
import './index.css'
import App from './components/App/App'
const noConnectAlert = () => <Alert message="Error" description="Проверьте соединение" type="error" showIcon={true} />

createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>{noConnectAlert()}</Offline>
  </>
)
