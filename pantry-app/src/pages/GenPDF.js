import React, { PureComponent } from 'react'
import jsPDF from 'jspdf'

export default class pdfGenerator extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // const itemList = this.props.list.map(item =>(
  //   doc.text(50,y,item)
  // ))

  jsPdfGenerator = () => {
    console.log(this.props)
    var doc = new jsPDF('p', 'pt')
    doc.text(250, 50, 'Shopping List')
    let y = 50
    this.props.list.forEach((item, idx) => {
      y += 25
      doc.text(50, y, `${idx + 1}. ${item.title}`)
    })

    doc.setFont('courier')
    // doc.text(20, 30, 'This is text with courier font')
    doc.save('generated.pdf')
  }

  render() {
    return (
      <button onClick={this.jsPdfGenerator} className='btn'>
        Generate PDF
      </button>
    )
  }
}
