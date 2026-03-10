import fs from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';

import {
    SiOpenai, SiMake, SiZapier, SiAnthropic, SiVercel,
    SiGoogle, SiN8N, SiClickup, SiSlack, SiHubspot,
    SiAsana, SiTrello, SiNotion, SiGooglecloud
} from 'react-icons/si';
import { TbBrandMonday, TbBrandTeams, TbBrandOffice } from 'react-icons/tb';

const icons = {
    openai: SiOpenai,
    make: SiMake,
    zapier: SiZapier,
    anthropic: SiAnthropic,
    vercel: SiVercel,
    google: SiGoogle,
    n8n: SiN8N,
    clickup: SiClickup,
    mondaydotcom: TbBrandMonday,
    slack: SiSlack,
    hubspot: SiHubspot,
    asana: SiAsana,
    trello: SiTrello,
    microsoftteams: TbBrandTeams,
    microsoft: TbBrandOffice,
    notion: SiNotion,
    googlecloud: SiGooglecloud
};

const output = {};
for (const [key, Component] of Object.entries(icons)) {
    // Generate the SVG string
    output[key] = renderToStaticMarkup(React.createElement(Component, { size: 80, color: "#09bc8a" }));
}

fs.writeFileSync('extracted-icons.json', JSON.stringify(output, null, 2));
console.log('Icons extracted to extracted-icons.json');
