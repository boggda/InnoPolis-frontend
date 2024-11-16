import React, { useState } from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const TopicsTab = ({ newTopic, setNewTopic, newDescription, setNewDescription, addTopic, topics }) => {
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
  const [selectedAuth, setSelectedAuth] = useState('none');
  const [authAddresses, setAuthAddresses] = useState({
    chiliz: '',
    erc20: ''
  });
  const [minValues, setMinValues] = useState({
    chiliz: '',
    erc20: '',
    mineth: ''
  });

  const handleAuthAddressChange = (authType, value) => {
    setAuthAddresses(prev => ({
      ...prev,
      [authType]: value
    }));
  };

  const handleMinValueChange = (authType, value) => {
    setMinValues(prev => ({
      ...prev,
      [authType]: value
    }));
  };

  return (
    <div className="topics">
      <h2>Topics</h2>
      <div className="input-group">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Enter a new topic"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a description"
        />
        <button onClick={() => addTopic(
          provider, 
          selectedAuth, 
          selectedAuth === 'none' || selectedAuth === 'ens' || selectedAuth === 'mineth' 
            ? '' 
            : authAddresses[selectedAuth],
          selectedAuth === 'none' || selectedAuth === 'ens' 
            ? '' 
            : minValues[selectedAuth]
        )}>Add Topic</button>
      </div>

      <div className="requirements-table">
        <table>
          <thead>
            <tr>
              <th>AuthManager</th>
              <th>Used</th>
              <th>Address</th>
              <th>MinValue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>None</td>
              <td><input 
                type="radio" 
                name="required" 
                checked={selectedAuth === 'none'}
                onChange={() => setSelectedAuth('none')} 
              /></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>ENS</td>
              <td><input 
                type="radio" 
                name="required" 
                checked={selectedAuth === 'ens'}
                onChange={() => setSelectedAuth('ens')} 
              /></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Chiliz</td>
              <td><input 
                type="radio" 
                name="required" 
                checked={selectedAuth === 'chiliz'}
                onChange={() => setSelectedAuth('chiliz')} 
              /></td>
              <td><input 
                type="text" 
                placeholder="Address" 
                value={authAddresses.chiliz}
                onChange={(e) => handleAuthAddressChange('chiliz', e.target.value)}
                disabled={selectedAuth !== 'chiliz'}
              /></td>
              <td><input 
                type="text" 
                placeholder="Min" 
                value={minValues.chiliz}
                onChange={(e) => handleMinValueChange('chiliz', e.target.value)}
                disabled={selectedAuth !== 'chiliz'}
              /></td>
            </tr>
            <tr>
              <td>ERC20</td>
              <td><input 
                type="radio" 
                name="required" 
                checked={selectedAuth === 'erc20'}
                onChange={() => setSelectedAuth('erc20')} 
              /></td>
              <td><input 
                type="text" 
                placeholder="Address" 
                value={authAddresses.erc20}
                onChange={(e) => handleAuthAddressChange('erc20', e.target.value)}
                disabled={selectedAuth !== 'erc20'}
              /></td>
              <td><input 
                type="text" 
                placeholder="Min" 
                value={minValues.erc20}
                onChange={(e) => handleMinValueChange('erc20', e.target.value)}
                disabled={selectedAuth !== 'erc20'}
              /></td>
            </tr>
            <tr>
              <td>MinETH</td>
              <td><input 
                type="radio" 
                name="required" 
                checked={selectedAuth === 'mineth'}
                onChange={() => setSelectedAuth('mineth')} 
              /></td>
              <td></td>
              <td><input 
                type="text" 
                placeholder="Min" 
                value={minValues.mineth}
                onChange={(e) => handleMinValueChange('mineth', e.target.value)}
                disabled={selectedAuth !== 'mineth'}
              /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="topic-list">
        {topics.map(topic => (
          <div key={topic.id} className="topic-card">
            <h3>{topic.title}</h3>
            <h4>{topic.contractAddr}</h4>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsTab; 