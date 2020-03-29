import React  from 'react';
import Button from '@material-ui/core/Button';

export default function LoginView() {
    return (
        <div>
            <Button variant="contained" color="primary" disableElevation>
                로그인
            </Button>
            <Button variant="contained" color="primary" disableElevation>
                회원가입
            </Button>
        </div>
    );
  }


