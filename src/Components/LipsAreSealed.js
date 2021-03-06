import React, {Component} from 'react'
import axios from 'axios'
import Reveal from './Reveal'


class LipsAreSealed extends Component {
    constructor(){
        super();
        this.state = {
            hiddenSecrets: [],
            randoms: []
        }
    }
    componentDidMount(){

        let randoms = []
        while(randoms.length < 3){
            let num = Math.floor(Math.random() * 56) + 1;
            if(randoms.indexOf(num)){
                randoms.push(num);
            }
        }

        this.setState({
            randoms
        })

        axios.get('/api/secrets').then(res => {
          this.setState({
            hiddenSecrets: res.data
          })
        })
      }

      handleAdd = (event) => {
          console.log(event.target.value)
        // this.props.addTopSecrets()
      }

    render(){
        
        // console.log(randoms)
        let threeSecrets = this.state.hiddenSecrets.filter(secrets => {
            return this.state.randoms.includes(secrets.id)
        })
        let threeSecretsDisplay = threeSecrets.map(secret => {
            // console.log(secret)
            return <Reveal 
            key={secret.id} 
            secret={secret}
            addTopSecret={this.props.addTopSecret}
            
            />
        })
        console.log(threeSecretsDisplay)
        return(
            <div className="lipsList-container"
            onClick={e =>this.handleAdd(e)}
            >
                {threeSecretsDisplay}
            </div>
        )
    }
}

export default LipsAreSealed

