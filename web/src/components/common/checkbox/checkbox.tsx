import {ReactNode} from 'react';
import Container from '../container';
import Flex from '../flex';
import Icon from '../icon';
import styles from './checkbox.module.scss';

type Props = {
    children?: ReactNode;
    onChange?: (value: boolean) => void;
    value?: boolean;
    className?: string;
};

const Checkbox = ({children, onChange, value, className = ''}: Props) => (
    <Container className={`${className}`}>
        <Flex gap={10}>
            <label className="">
                <input
                    checked={value}
                    type="checkbox"
                    onChange={e => onChange && onChange(e.target.checked)}
                />
                <span className=""></span>
            </label>
            {children}
        </Flex>
    </Container>
);

export default Checkbox;
