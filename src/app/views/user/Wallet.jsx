import React from 'react';

import WalletOverviewContainer from '../../containers/user/wallet/WalletOverview';
import TransactionsContainer from '../../containers/user/wallet/Transactions';

const WalletView = function () {
  return (
    <div className="height100 content">
      <WalletOverviewContainer />
      <TransactionsContainer />
    </div>
  )
}

export default WalletView;
