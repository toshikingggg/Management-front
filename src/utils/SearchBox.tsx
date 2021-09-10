import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

type Props = {
  setModal: () => void;
  setSearchedOrg: React.Dispatch<React.SetStateAction<any>>;
};
const SearchBox: React.FC<Props> = ({ setModal, setSearchedOrg }) => {
  const classes = useStyles();
  const [serchOrg, setSerchOrg] = useState('');

  const fetchData = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setModal();
    await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/organization?search=${serchOrg}`, {
      headers: {
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw 'authentication failed';
        }
        if (res.status === 500) {
          throw 'Internal Error!';
        }
        return res.json();
      })
      .then((data) => {
        setSearchedOrg(data);
      })
      .catch((e) => alert(e));
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={fetchData}>
      <InputBase
        className={classes.input}
        placeholder="Search Group"
        inputProps={{ 'aria-label': 'search group' }}
        value={serchOrg}
        onChange={(e) => {
          setSerchOrg(e.target.value);
        }}
        // onClick={setModal}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        // onSubmit={fetchData}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
