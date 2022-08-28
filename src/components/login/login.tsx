import Button from 'components/common/button';
import Flex from 'components/common/flex';
import Input from 'components/common/input';
import Link from 'components/common/typography/link';
import Modal from 'components/common/modal';
import Title from 'components/common/typography/title';
import {useState} from 'react';
import styles from './login.module.scss';

const Login = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Link onClick={() => setShowModal(true)}>Login/Sign up</Link>
            {showModal ? (
                <Modal close={() => setShowModal(false)}>
                    <Title className={styles.title} level="h3">
                        Login
                    </Title>
                    <Input
                        className={styles.input}
                        altBackground
                        placeholder="Emal"
                    />
                    <Input
                        className={styles.input}
                        altBackground
                        placeholder="Password"
                    />
                    <Flex gap={20}>
                        <Button icon="check">Login</Button>
                        <Link>Sign up</Link>
                    </Flex>
                </Modal>
            ) : null}
        </>
    );
};

export default Login;
