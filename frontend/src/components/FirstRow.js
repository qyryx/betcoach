import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const FirstRow = ({ category }) => {

  const home = (
    <Tooltip id="tooltip">
      home team wins
    </Tooltip>
  );

  const draw = (
    <Tooltip id="tooltip">
      draw
    </Tooltip>
  );

  const away = (
    <Tooltip id="tooltip">
      away team wins
    </Tooltip>
  );

  const homeDraw = (
    <Tooltip id="tooltip">
      home wins or draw
    </Tooltip>
  );

  const awayDraw = (
    <Tooltip id="tooltip">
      away wins or draw
    </Tooltip>
  );

  const homeAway = (
    <Tooltip id="tooltip">
      home or away wins
    </Tooltip>
  );

  const six = (
    <div className='tableRow'>
      <div className='match'>Match</div>
      <OverlayTrigger placement="top" overlay={home}>
        <div className='firstRowButton'>1</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={draw}>
        <div className='firstRowButton'>0</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={away}>
        <div className='firstRowButton'>2</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={homeDraw}>
        <div className='firstRowButton'>10</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={awayDraw}>
        <div className='firstRowButton'>02</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={homeAway}>
        <div className='firstRowButton'>12</div>
      </OverlayTrigger>
      <div className='dateTime'>date&nbsp;&nbsp;time</div>
    </div>
  );

  const two = (
    <div className='tableRow'>
      <div className='match'>Match</div>
      <OverlayTrigger placement="top" overlay={home}>
        <div className='firstRowButton'>1</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={away}>
        <div className='firstRowButton'>2</div>
      </OverlayTrigger>
      <div className='dateTime'>date&nbsp;&nbsp;time</div>
    </div>
  );

  const Row = ({ category }) => {
    switch (category) {
      case 'england':
      case 'germany':
      case 'spain':
      case 'italy':
      case 'france':
      case 'nhl':
      case 'ahl':
      case 'whl':
      case 'iihf':
        return six
      case 'oktagon':
      case 'ufc':
      case 'atp':
      case 'wta':
        return two
      default:
        return null
    }
  }

  return (
    <Row category={category} />
  )
}

export default FirstRow