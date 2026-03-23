/**
 * Site-wide copy and links. Update here instead of duplicating across HTML files.
 */
export const siteConfig = {
  brandName: 'TBN',

  contact: {
    email: 'info@torontobinet.org',
    subject: 'Website inquiry',
    body: [
      'Hi,',
      '',
      'I saw your website and would like to get in touch.',
      '',
      'Name:',
      '',
      'Email:',
      '',
      'Message:',
      '',
    ].join('\n'),
  },

  /** Home page (`index.html`) hero and highlight cards */
  home: {
    heroTitle: 'Welcome',
    heroSubtitle: `Welcome to the Toronto Bi+ Network —a community rooted in connection, visibility, and care. 
    If you'd like to get to know us better, visit the About section to explore who we are and the values that guide us. 
    In People, you'll find the individuals who bring this community to life, while Events keeps you up to date on gatherings and opportunities to connect.
    Our Support Groups, accessible through the menu, offer dedicated spaces for all genders, as well as for men and women, where you can find understanding and solidarity. 
    During Pride, join us in celebrating under the Pride section, and if you ever wish to reach out, the Contact page is always open.
    We're truly glad you've found your way here.`,
    
    
      eventsCta: { href: 'events.html', label: 'View Events' },
    highlightCards: [
      {
        title: 'Mission',
        body:
          'Placeholder mission content. Replace this with your actual mission statement and key points.',
      },
      {
        title: 'What we do',
        body: 'Placeholder services content. Add descriptions, links, and relevant details.',
      },
      {
        title: 'Get involved',
        body: 'Add volunteer, partnership, or contact details here.',
      },
    ],
  },

  /**
   * Support group dropdown (all pages) + per-page content (`support-groups-*.html`).
   * `pages` keys must match `body[data-support-group]`.
   */
  supportGroups: {
    nav: [
      { href: 'support-groups-general.html', label: 'All-Gender' },
      { href: 'support-groups-mens.html', label: 'Men' },
      { href: 'support-groups-womens.html', label: 'Women' },
    ],

    quote: {
      citeName: 'Charles Dickens',
      text: 'No one is useless in this world who lightens the burdens of another.',
    },

    sharedIntro: {
      /** `{brand}` is replaced with `brandName` */
      headingTemplate: '{brand} Support Groups',
      paragraph: [
        'Support groups play a crucial role for the queer community in Toronto by providing safe,',
        'affirming spaces where individuals can share experiences, access resources, and build meaningful connections.',
        'Across the city—particularly in hubs like The 519.',
        'These groups help combat isolation in a large urban environment by fostering belonging and offering culturally competent support, especially for those facing challenges',
        'like housing insecurity or discrimination. Regular events tied to initiatives like Pride Toronto further connect individuals to these networks,',
        'reinforcing a sense of visibility and solidarity. Beyond emotional support, Toronto-based groups often provide practical resources—legal aid referrals,',
        'healthcare navigation, and employment workshops—empowering community members to thrive while also strengthening collective advocacy for a more inclusive city.',
      ].join(' '),
    },

    whatToExpectHeading: 'What to expect',

    venue: {
      mapsUrl: 'https://maps.google.com/?q=519+Church+Street,+Toronto,+ON',
      line: '519 Church Street, Toronto, ON',
    },

    pages: {
      general: {
        pageTitle: 'General Support Group',
        previewPanelId: 'general-support-hover-preview',
        whatToExpectHeadingId: 'what-to-expect-heading-general',
        meeting: {
          title: 'General Support Group',
          paragraphs: [
            'Meetings centre on discussion of topics raised by those in attendance. Talk often turns to relationships and safer sex, to sexual fluidity, and to our place within the larger queer community. Biphobia and panphobia come up, as do questions about what bisexuality and pansexuality mean in everyday life. Those themes are common, but the list is not fixed—if something else matters to the group that night, there is room for that too.',
            'To help create a safer space, confidentiality is emphasized: what is said in the meeting stays in the meeting.',
            'Afterwards, there is an opportunity for informal social time at a nearby restaurant or bar for anyone who would like to connect further in a more relaxed setting.',
          ],
        },
        whatToExpect:
          'Coming to an all-gender support group can ease the isolation many bi+ and questioning people feel and remind you that your experiences are valid. You will find peers who understand navigating biphobia, fluidity, and relationships without having to explain the basics—and you can share as much or as little as you like. The group offers a steady place to practise asking for support, hear how others cope, and build friendships that often extend beyond the meeting. Many people leave feeling lighter, more connected, and better equipped to show up authentically in the rest of their lives.',
        card: {
          anchorId: 'support-group-all-gender',
          heading: 'General Support Group',
          scheduleLine: 'Every 3rd Thursday - 7:30 - 8:30 PM',
        },
      },

      womens: {
        pageTitle: "Women's Support Group",
        previewPanelId: 'womens-support-hover-preview',
        whatToExpectHeadingId: 'what-to-expect-heading-womens',
        meeting: {
          title: "Women's Support Group",
          paragraphs: [
            'Meetings centre on discussion of topics raised by those in attendance. Talk often turns to relationships and safer sex, to sexual fluidity, and to our place within the larger queer community. Biphobia and panphobia come up, as do questions about what bisexuality and pansexuality mean in everyday life. Those themes are common, but the list is not fixed—if something else matters to the group that night, there is room for that too.',
            'To help create a safer space, confidentiality is emphasized: what is said in the meeting stays in the meeting.',
            'Afterwards, there is an opportunity for informal social time at a nearby restaurant or bar for anyone who would like to connect further in a more relaxed setting.',
          ],
        },
        whatToExpect:
          "A women-centered support group can be especially affirming if you want a space shaped around women's lives, relationships, and identities while exploring bi+ or questioning experiences. You benefit from peer support that understands how sexism and queer exclusion can overlap, and from conversation that does not center men's perspectives. Participants often describe feeling safer naming doubts, desires, and boundaries, building trust with others who share similar pressures, and leaving with practical reassurance and lasting connections.",
        card: {
          anchorId: 'support-group-womens',
          heading: "Women's Support Group",
          scheduleLine: 'Every 1st Thursday - 8:00 - 9:30 PM',
        },
      },

      mens: {
        pageTitle: "Men's Support Group",
        previewPanelId: 'mens-support-hover-preview',
        whatToExpectHeadingId: 'what-to-expect-heading-mens',
        meeting: {
          title: "Men's Support Group",
          paragraphs: [
            'Meetings are guided by the topics people raise when they are there. Conversation often includes relationships and safer sex, how we sit within the larger queer community, biphobia and panphobia, coming out, and what bisexuality and pansexuality can mean in real life. Those threads show up a lot, but the evening is not limited to them—if something else is on your mind, there is space for that as well.',
            'To help keep the room a safer place to speak openly, confidentiality is emphasized: what is said in the meeting is not carried outside it.',
            'When the meeting ends, you are welcome to continue in a more casual way at a nearby restaurant or bar—informal social time for anyone who wants to stick around and connect.',
          ],
        },
        whatToExpect:
          'Joining a men-centered support group can make it easier to talk openly about attraction, identity, and stigma in a room that takes men\'s bi+ experiences seriously—including shame, erasure, and the pressure to "pick a side." You can expect honest, non-judgmental listening, shared strategies for coming out and relationships, and relief from carrying everything alone. Many members value the camaraderie, the normalization of their stories, and the confidence that comes from knowing others have faced similar hurdles and kept going.',
        card: {
          anchorId: 'support-group-mens',
          heading: "Men's Support Group",
          scheduleLine: 'Every 4th Tuesday - 7:00 - 8:30 PM',
        },
      },
    },
  },
};
