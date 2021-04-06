import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { interval} from 'rxjs';
import checkDoubleClick from './utils/checkDoubleClick';
import createFormatTime from './utils/createFormatTime';

function App() {
  const [time, setTime] = useState(0)
  const [start, setStart] = useState(true)
  const timer$ = useRef()

  const handleStop = () => {
    setStart(false)
    setTime(0)
  }

  const handleStart =() => {
    setStart(true)
  }

  const handleWait = () => {
    if (checkDoubleClick()) {
      setStart(false)
    }
  }

  useEffect(() => {
    if (start) {
      timer$.current = interval(1000)
      .subscribe(
        () => setTime(prev => prev + 1)
      )
    } else timer$.current.unsubscribe()
    return () => timer$.current.unsubscribe()
  }, [start])

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{height: "100vh"}}
      >
        <Typography variant="h2">{createFormatTime(time)}</Typography>
        <Box component="span" m={1}>
          {start
            ?
            <Button color='secondary' onClick={handleStop}>Stop</Button>
            :
            <Button color='primary' onClick={handleStart}>Start</Button>
          }
          <Button onClick={handleWait}>Wait</Button>
          <Button onClick={() => setTime(0)}>Reset</Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default App;