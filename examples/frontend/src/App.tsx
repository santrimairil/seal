// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Flex direction="column" align="center" gap="6" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'white' }}>SealSui Testnet by Santri Mairil</h1>

      {/* Logo */}
      <img
        src="/santri-mairil-logo.jpg"
        alt="Santri Mairil Logo"
        style={{ width: '150px', borderRadius: '50%' }}
      />

      <h2 style={{ fontSize: '1.5rem', color: 'white' }}>Community Team</h2>

      {/* Twitter Only */}
      <Flex gap="4" justify="center">
        <a href="https://x.com/santrimairil" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" alt="Twitter" style={{ width: '32px' }} />
        </a>
      </Flex>

      {/* Grid for Try Sections */}
      <Grid columns="2" gap="6" style={{ width: '80%' }}>
        {/* TRY Allowlist */}
        <Card>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>TRY Allowlist</h3>
          <p><strong>Tutorial</strong></p>
          <ol style={{ textAlign: 'left' }}>
            <li>Click 'Try it'</li>
            <li>Create Your Name Allow List</li>
            <li>Add New Sui Wallet</li>
            <li>Select Walrus service</li>
            <li>Upload file</li>
            <li>Click 'First step: Encrypt and upload to Walrus'</li>
            <li>Click 'Second step: Associate file to Sui object'</li>
            <li>Done</li>
          </ol>
          <Link to="/allowlist-example">
            <Button size="3">Try it</Button>
          </Link>
        </Card>

        {/* TRY Subscription */}
        <Card>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>TRY Subscription</h3>
          <p><strong>Tutorial</strong></p>
          <ol style={{ textAlign: 'left' }}>
            <li>Click 'Try it'</li>
            <li>Enter Price in Mist</li>
            <li>Subscription duration in minutes</li>
            <li>Name of the Service</li>
            <li>Click Create Service</li>
            <li>Click 'this link'</li>
            <li>Click and Download Decrypt</li>
            <li>Done</li>
          </ol>
          <Link to="/subscription-example">
            <Button size="3">Try it</Button>
          </Link>
        </Card>
      </Grid>
    </Flex>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');
  return (
    <Container>
      <Flex position="sticky" px="4" py="2" justify="between">
        <h1 className="text-4xl font-bold m-4 mb-8">Seal Example Apps</h1>
        {/* <p>TODO: add seal logo</p> */}
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Card style={{ marginBottom: '2rem' }}>
        <p>
          1. Code is available{' '}
          <a href="https://github.com/MystenLabs/seal/tree/main/examples">here</a>.
        </p>
        <p>
          2. These examples are for Testnet only. Make sure you wallet is set to Testnet and has
          some balance (can request from <a href="https://faucet.sui.io/">faucet.sui.io</a>).
        </p>
        <p>
          3. Blobs are only stored on Walrus Testnet for 1 epoch by default, older files cannot be
          retrieved even if you have access.
        </p>
        <p>
          4. Currently only image files are supported, and the UI is minimal, designed for demo
          purposes only!
        </p>
      </Card>
      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <div>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>Please connect your wallet to continue</p>
      )}
    </Container>
  );
}

export default App;
