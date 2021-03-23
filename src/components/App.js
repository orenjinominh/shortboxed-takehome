
import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comic: []
    };

    this.fetchComicsMeta.bind(this);
  }


  fetchComicsMeta(id) {
    console.log('id is here', id);
    $.ajax({
      url: `http://localhost:4000/api/cbcs/json/${id}`,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          comic: [...data]
        });
        console.log('Retrieved comic data successfully!', data);
      },
      error: function(err) {
        console.log("Failed to get the data from the server ", err);
      }
    });
  };

  componentDidMount(){
    console.log('Current listing is:', this.props.id);
    this.fetchComicsMeta(this.props.id);
  };
  



  render() {
    return (
      <div> 
        <p> say something! {console.log(this.state.comic)}</p>
        <p>{this.state.comic}</p>
      </div>
    )
  }
}

export default App;
