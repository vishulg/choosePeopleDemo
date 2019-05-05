import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsers, 
    faUser, 
    faBed, 
    faChild, 
    faPlusCircle, 
    faMinusCircle 
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

library.add(faUsers, faUser, faBed, faChild, faPlusCircle, faMinusCircle);

const Wrapper = styled.div`
    max-width: 300px;
    margin : 50px auto;
    font-family: sans-serif;
`;

const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    line-height: 2.5;
    border-bottom: 1px solid #939393;

    &:last-child {
        border-bottom: none;
    }
`;

const Label = styled.div`
    color: #2f3090;
    font-weight: 300;

    svg {
        font-size: 13px;
    }
`;

const FontAwesomeIconBlue = styled(FontAwesomeIcon)`
    color: #2f3090;
    padding-right: 10px;
    cursor: pointer;
`;

const FontAwesomeIconPink = styled(FontAwesomeIcon)`
    color: #f8185b;
    padding-left: 10px;
    cursor: pointer;
`;

const Box = styled.div`
    border: 1px solid #939393;
    padding: 0 10px;
    margin-top: 5px;
`;

const Input = styled.div`
    color: #939393;
`;

class ChoosePeople extends React.Component {

    constructor() {
        super();
        this.state = {
            rooms: 1,
            adults: 1,
            children: 0,
        }
    }

    increment = (label) => {
        const { rooms, adults, children } = this.state;
        if(label === 'rooms') {
            this.setState({
                rooms: rooms + 1,
            }, () => {
                const { rooms, adults } = this.state;
                if(rooms > adults) {
                    this.setState({
                        adults: rooms,
                    });
                }
            });
        } else if (label === 'adults'){
            this.setState({
                adults: adults + 1,
            });
        } else {
            this.setState({
                children: children + 1,
            });
        }
        
    };

    decrement = (label) => {
        const { rooms, adults, children } = this.state;
        if(label === 'rooms') {
            this.setState({
                rooms: rooms - 1,
            }, () => {
                const { rooms, adults, children } = this.state;
                const maxAdults = rooms*4;
                if(maxAdults < (adults + children)) {
                    if(maxAdults < adults) {
                        this.setState({
                            adults: maxAdults,
                        }, () => {
                            const { adults } = this.state;
                            this.setState({
                                children: maxAdults - adults,
                            });
                        });
                    } else {
                        this.setState({
                            children: maxAdults - adults,
                        });
                    }
                }
            });
        } else if (label === 'adults') {
            this.setState({
                adults: adults - 1,
            });
        } else {
            this.setState({
                children: children - 1,
            });
        }
        
    };

    render() {
        const { rooms, adults, children } = this.state;
        return (
            <Wrapper>
                <Label>
                    <FontAwesomeIconBlue icon="users" /> 
                    Choose number of <b>People</b>
                </Label>
                <Box>
                    <InfoRow>
                        <Label>
                            <FontAwesomeIconBlue icon="bed" />
                            ROOMS
                        </Label>
                        <Input>
                            <FontAwesomeIconBlue icon="minus-circle"
                                onClick={ rooms > 1 ?
                                    () => this.decrement('rooms') :
                                    () => {}
                                }
                            />
                            <span>{rooms}</span>
                            <FontAwesomeIconPink icon="plus-circle" 
                                onClick={ rooms < 5 ?
                                    () => this.increment('rooms') :
                                    () => {}
                                }
                            />
                        </Input>
                    </InfoRow>
                    <InfoRow>
                        <Label>
                            <FontAwesomeIconBlue icon="user" />
                            ADULTS
                        </Label>
                        <Input>
                            <FontAwesomeIconBlue icon="minus-circle"
                                onClick={adults > 1 && adults > rooms ?
                                    () => this.decrement('adults') :
                                    () => {}
                                } 
                            />
                            <span>{adults}</span>
                            <FontAwesomeIconPink icon="plus-circle" 
                                onClick={(rooms*4) > (adults + children) ?
                                    () => this.increment('adults'):
                                    () => {}
                                } 
                            />
                        </Input>
                    </InfoRow>
                    <InfoRow>
                        <Label>
                            <FontAwesomeIconBlue icon="child" />
                            CHILDREN
                        </Label>
                        <Input>
                            <FontAwesomeIconBlue icon="minus-circle"
                                onClick={ children > 0 ?
                                    () => this.decrement('children') :
                                    () => {}
                                } 
                            />
                            <span>{children}</span>
                            <FontAwesomeIconPink icon="plus-circle" 
                                onClick={(rooms * 4) > (adults + children) ?
                                    () => this.increment('children'):
                                    () => {}
                                } 
                            />
                        </Input>
                    </InfoRow>
                </Box>
            </Wrapper>
        )
    }
}

export default ChoosePeople;