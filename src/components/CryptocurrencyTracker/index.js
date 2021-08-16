import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrenciesList from '../CryptocurrenciesList'
import './index.css'

class CryptocurrencyTracker extends Component {
  state = {cryptoList: [], isLoading: true}

  componentDidMount = () => {
    this.getCryptoData()
  }

  getCryptoData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const updatedData = data.map(eachCrypto => ({
      id: eachCrypto.id,
      currencyLogoUrl: eachCrypto.currency_logo,
      currencyName: eachCrypto.currency_name,
      usdValue: eachCrypto.usd_value,
      euroValue: eachCrypto.euro_value,
    }))
    this.setState({
      cryptoList: updatedData,
      isLoading: false,
    })
  }

  renderCryptocurrenciesList = () => {
    const {cryptoList} = this.state

    return <CryptocurrenciesList cryptoCurrenciesData={cryptoList} />
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderCryptocurrenciesList()
        )}
      </div>
    )
  }
}

export default CryptocurrencyTracker
