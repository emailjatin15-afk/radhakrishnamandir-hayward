/* ==========================================================================
   Hari Om Shri Radha Krishna Mandir Hayward — Shared Script
   --------------------------------------------------------------------------
   1. TRANSLATIONS  — all site text by language (add a language = add a key)
   2. EVENTS        — festival & special-event data (edit here, no backend)
   3. Language switching
   4. Header, mobile menu, scroll effects
   5. Scroll-reveal animations
   6. Temple hours, "today" program, weekly schedule
   7. Events rendering & filters
   8. Gallery filters & lightbox
   9. Donation form  (payment integration point → PaymentGateway)
   10. Contact form  (form backend integration point → ContactFormHandler)
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. TRANSLATIONS
     ------------------------------------------------------------------------
     HOW IT WORKS
     • In the HTML, an element with data-i18n="some.key" gets its text replaced.
     • data-i18n-html="key"        → value may contain HTML (e.g. placeholder spans)
     • data-i18n-aria="key"        → sets aria-label
     • data-i18n-placeholder="key" → sets the input placeholder
     • Keys missing from a language fall back to English.

     TO ADD A LANGUAGE (e.g. Gujarati):
     1) Add an entry to LANGUAGES below:  gu: { label: 'ગુ', htmlLang: 'gu' }
     2) Add TRANSLATIONS.gu = { ...same keys... }
     The header toggle cycles through LANGUAGES in order.
     ------------------------------------------------------------------------ */
  const LANGUAGES = {
    en: { label: 'EN', htmlLang: 'en', locale: 'en-US' },
    hi: { label: 'हिं', htmlLang: 'hi', locale: 'hi-IN' },
  };
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'hsrkm-lang';

  const PH = (text) => `<span class="placeholder">[PLACEHOLDER: ${text}]</span>`;

  const TRANSLATIONS = {
    en: {
      /* Page titles */
      'meta.home': 'Hari Om Shri Radha Krishna Mandir Hayward | Hayward Hindu Temple',
      'meta.about': 'About Us | Hari Om Shri Radha Krishna Mandir Hayward',
      'meta.events': 'Festivals & Events | Hari Om Shri Radha Krishna Mandir Hayward',
      'meta.activities': 'Activities & Services | Hari Om Shri Radha Krishna Mandir Hayward',
      'meta.gallery': 'Photo Gallery | Hari Om Shri Radha Krishna Mandir Hayward',
      'meta.donate': 'Donate | Hari Om Shri Radha Krishna Mandir Hayward',
      'meta.contact': 'Contact & Directions | Hari Om Shri Radha Krishna Mandir Hayward',

      /* Common / header / footer */
      'common.skip': 'Skip to main content',
      'common.langToggle': 'Switch language to Hindi',
      'common.menu': 'Open menu',
      'common.menuClose': 'Close menu',
      'common.backToTop': 'Back to top',
      'common.giveNow': 'Give now',
      'common.viewEvents': 'View events',
      'common.getDirections': 'Get directions',
      'top.hours': 'Open daily · 8:00 AM – 8:00 PM',
      'brand.name': 'Shri Radha Krishna Mandir',
      'brand.sub': 'Hari Om · Hayward',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.events': 'Events',
      'nav.activities': 'Activities',
      'nav.gallery': 'Gallery',
      'nav.donate': 'Donate',
      'nav.contact': 'Contact',
      'cta.title': 'Support Seva at the Mandir',
      'cta.text': 'Every offering helps keep the lamps lit, the prasad flowing, and the doors open for all.',
      'cta.contact': 'Contact Us',
      'cta.message': 'Send a Message',
      'footer.name': 'Hari Om Shri Radha Krishna Mandir',
      'footer.sub': 'Hayward Hindu Temple',
      'footer.about': 'A home of devotion to Shri Radha Krishna, serving the Hindu community of Hayward and the East Bay.',
      'footer.visit': 'Visit Us',
      'footer.hours': 'Open daily, 8:00 AM – 8:00 PM',
      'footer.explore': 'Explore',
      'footer.trustees': 'Temple Trustees & Management:',
      'footer.copyright': 'Hari Om Shri Radha Krishna Mandir Hayward. All rights reserved.',

      /* Days */
      'day.sunday': 'Sunday',
      'day.monday': 'Monday',
      'day.tuesday': 'Tuesday',
      'day.wednesday': 'Wednesday',
      'day.thursday': 'Thursday',
      'day.friday': 'Friday',
      'day.saturday': 'Saturday',
      'day.tueShort': 'Tue',
      'day.friShort': 'Fri',
      'day.every': 'Every',
      'day.weekly': 'Weekly',
      'day.regular': 'Regular',
      'day.sessions': 'Sessions',

      /* Timings */
      'time.darshan': 'Darshan',
      'time.morningAarti': 'Morning Aarti',
      'time.eveningAarti': 'Sandhya (Evening) Aarti',

      /* Weekly programs (shared) */
      'programs.eyebrow': 'Every Week',
      'programs.title': 'Weekly Programs',
      'programs.lead': 'Join the sangat for scripture, song, and satsang. Everyone is welcome — no registration needed.',
      'programs.regular': 'Regular Sessions',
      'programs.ramayan': 'Ramayan Path',
      'programs.ramayanText': 'Collective reading of the Ramayan — the sacred story of Shri Ram — recited together in devotion.',
      'programs.bhajans': 'Bhajans & Kirtans',
      'programs.bhajansText': 'An evening of devotional singing with harmonium, dholak, and kartals. Come sing the names of the Divine.',
      'programs.katha': 'Katha',
      'programs.kathaText': 'Recitation and discourse on sacred scriptures, sharing timeless teachings for everyday life.',

      /* Home */
      'home.hero.eyebrow': 'Hayward Hindu Temple',
      'home.hero.title': 'Hari Om Shri Radha Krishna Mandir',
      'home.hero.place': 'Hayward, California',
      'home.hero.tagline': 'A sacred home of devotion, seva, and community — where every visitor is welcomed with the love of Shri Radha Krishna.',
      'home.hero.cta1': 'Plan Your Visit',
      'home.hero.cta2': 'Upcoming Events',
      'glance.hoursTitle': 'Temple Hours',
      'glance.open': 'Open daily',
      'glance.hoursNote': 'Open every day of the week. All are welcome.',
      'glance.aartiTitle': 'Darshan & Aarti',
      'glance.todayTitle': 'Today at the Mandir',
      'glance.thisWeek': 'This week',
      'glance.defaultProgram': 'Daily Darshan & Aarti',
      'glance.defaultNote': 'Tuesday: Ramayan Path · Friday: Bhajans & Kirtans',
      'glance.fullSchedule': 'See full schedule',
      'home.quick.eyebrow': 'Plan & Participate',
      'home.quick.title': 'Begin Your Visit',
      'home.quick.events': 'Festivals & Events',
      'home.quick.eventsText': 'Celebrate Diwali, Navratri, Holi, Janmashtami and more with the community.',
      'home.quick.donate': 'Donate & Seva',
      'home.quick.donateText': 'Your offerings sustain daily puja, prasad, festivals, and the temple home we share.',
      'home.quick.visit': 'Visit & Directions',
      'home.quick.visitText': '29490 Mission Blvd, Hayward. Find directions, parking tips, and how to reach us.',
      'home.welcome.eyebrow': 'Welcome',
      'home.welcome.title': 'A Spiritual Home for Every Devotee',
      'home.welcome.p1': 'Hari Om Shri Radha Krishna Mandir — known locally as the Hayward Hindu Temple — is a place of prayer, peace, and togetherness. With Shri Radha Krishna as our presiding deities, the mandir serves the wider Hindu community of Hayward and the East Bay.',
      'home.welcome.p2': 'Our mission is simple: to keep the lamp of devotion burning through daily worship, scripture, bhajans, and seva — and to offer families a place where our traditions are lived, celebrated, and passed on.',
      'home.welcome.quote': '“Whoever offers Me with devotion a leaf, a flower, a fruit, or water — that offering of love I accept.”',
      'home.welcome.cite': '— Bhagavad Gita 9.26',
      'home.welcome.cta': 'Learn About the Mandir',
      'home.stat1': 'Open Daily',
      'home.stat2': 'All Are Welcome',
      'home.stat2sub': 'Families & visitors',
      'home.upcoming.eyebrow': 'Celebrate Together',
      'home.upcoming.title': 'Upcoming Festivals',
      'home.upcoming.cta': 'See All Events',

      /* About */
      'about.hero.eyebrow': 'About the Mandir',
      'about.hero.title': 'Our Temple & Our Faith',
      'about.hero.text': 'Rooted in bhakti, open to all — the story, the deities, and the values that guide our community.',
      'about.history.eyebrow': 'Our Story',
      'about.history.title': 'History & Mission',
      'about.history.p1': `Hari Om Shri Radha Krishna Mandir — the Hayward Hindu Temple — was established in ${PH('founding year')} by ${PH('founding families / organization')} to give local devotees a place to worship together.`,
      'about.history.p2': PH('2–3 sentences on how the temple began, its first home, and how it came to 29490 Mission Blvd.'),
      'about.history.p3': 'Our mission is to nurture bhakti (devotion) to Shri Radha Krishna, preserve and share Sanatan Dharma traditions with the next generation, and serve as a welcoming spiritual home for the entire Hindu community — whatever their region, language, or tradition.',
      'about.timeline.title': 'Milestones',
      'about.timeline.1': 'Temple founded by the community',
      'about.timeline.2': 'Pran Pratishtha (installation) of Shri Radha Krishna',
      'about.timeline.3': 'Weekly Ramayan Path and Bhajan programs begin',
      'about.deities.eyebrow': 'Presiding Deities',
      'about.deities.title': 'Divine Presence at the Mandir',
      'about.deities.note': `Serving the broader Hindu community, the mandir also honors other beloved deities. ${PH('confirm which murtis are installed')}`,
      'about.rk.eyebrow': 'Main Deity',
      'about.rk.title': 'Shri Radha Krishna',
      'about.rk.p1': 'Shri Krishna, the beloved of Vrindavan, and Shri Radha, the embodiment of pure devotion, are the heart of our mandir. Together they represent divine love — the eternal bond between the soul and the Supreme.',
      'about.rk.p2': 'Devotees come for darshan, to offer flowers and prasad, to sing their names in kirtan, and to find peace in their presence. Special celebrations are held on Janmashtami, Radha Ashtami, Holi, and Govardhan Puja.',
      'about.rk.note': PH('details about the murtis — e.g., origin, installation date, adornment traditions'),
      'deity.shiva': 'Lord Shiva',
      'deity.shivaText': 'Mahadev, the auspicious one — worshipped with abhishek, especially on Mondays and Maha Shivratri.',
      'deity.hanuman': 'Shri Hanuman',
      'deity.hanumanText': 'The devoted servant of Shri Ram, embodiment of strength and courage — honored with Hanuman Chalisa.',
      'deity.durga': 'Durga Mata',
      'deity.durgaText': 'The Divine Mother who protects her devotees — celebrated with great joy during Navratri.',
      'deity.ganesh': 'Shri Ganesh',
      'deity.ganeshText': 'Remover of obstacles, invoked at the start of every puja and new beginning.',
      'about.values.eyebrow': 'What Guides Us',
      'about.values.title': 'Our Values & Community',
      'values.bhakti': 'Bhakti',
      'values.bhaktiText': 'Loving devotion to the Divine, expressed through worship, kirtan, and prayer.',
      'values.seva': 'Seva',
      'values.sevaText': 'Selfless service to the temple and to others — from preparing prasad to helping neighbors.',
      'values.sanskriti': 'Sanskriti',
      'values.sanskritiText': 'Preserving scripture, language, music, and festivals so our heritage lives on in our children.',
      'values.sangha': 'Sangha',
      'values.sanghaText': 'A warm, inclusive community where every family and visitor feels at home.',
      'about.mgmt.title': 'Temple Management',
      'about.mgmt.text': 'The mandir is run by a dedicated committee of volunteers and trustees.',
      'about.mgmt.president': 'President',
      'about.mgmt.secretary': 'Secretary',
      'about.mgmt.treasurer': 'Treasurer',
      'about.mgmt.priest': 'Pujari (Priest)',
      'about.social.title': 'Follow Us on Facebook',
      'about.social.text': 'See photos, announcements, and updates from temple events.',
      'about.social.cta': 'Visit our Facebook page',
      'about.join.title': 'Get Involved',
      'about.join.text': 'Volunteer for festivals, help with prasad, join the bhajan group, or sponsor a puja. There is a place for everyone in seva.',
      'about.guru.eyebrow': 'Our Spiritual Guide',
      'about.guru.title': 'JagatGuru Swamiji Maharaj',
      'about.guru.name': 'JagatGuru Swami Indravijay Narayan Ji Suryavanshi Akhada',
      'about.guru.bio': PH('biography — spiritual lineage, teachings, and role at the mandir'),
      'about.guru.cta': 'Seek Blessings at the Mandir',
      'blessing.with': 'With the blessings and love of',
      'gallery.altar': 'Temple Altar',

      /* Home — Stay connected */
      'home.connect.eyebrow': 'Stay Connected',
      'home.connect.title': 'Be Part of the Mandir Family',
      'home.connect.lead': 'Get updates, lend a helping hand, and follow along online.',
      'home.connect.whatsapp': 'Join Temple WhatsApp',
      'home.connect.whatsappText': 'Receive announcements about aarti, festivals, and events directly on your phone.',
      'home.connect.whatsappCta': 'Join WhatsApp Group',
      'home.connect.volunteer': 'Sign Up to Volunteer',
      'home.connect.volunteerText': 'Help with festivals, prasad, decorations, and daily seva. Every helping hand is a blessing.',
      'home.connect.volunteerCta': 'Volunteer Sign-Up',
      'home.connect.social': 'Follow Us',
      'home.connect.socialText': 'Watch bhajans and katha on YouTube and see temple news and photos on Facebook.',

      /* Events */
      'events.hero.eyebrow': 'Utsav & Satsang',
      'events.hero.title': 'Festivals & Events',
      'events.hero.text': 'Celebrate the sacred calendar with the mandir family — from weekly satsang to grand festivals.',
      'events.weekly.eyebrow': 'Recurring',
      'events.tag.weekly': 'Weekly',
      'events.tag.recurring': 'Recurring',
      'events.upcoming.eyebrow': 'Mark Your Calendar',
      'events.upcoming.title': 'Upcoming Festivals & Special Events',
      'events.upcoming.note': `Festival dates follow the Hindu lunar calendar. Dates shown are tentative ${PH('confirm with temple committee')}.`,
      'events.filterLabel': 'Filter events',
      'events.filter.all': 'All',
      'events.filter.festival': 'Festivals',
      'events.filter.special': 'Special Events',
      'events.cta.title': 'Sponsor a Festival Puja',
      'events.cta.text': 'Families may sponsor aarti, bhog, or festival celebrations in honor of loved ones.',

      /* Activities */
      'act.hero.eyebrow': 'Worship & Seva',
      'act.hero.title': 'Activities & Services',
      'act.hero.text': 'Daily darshan, weekly satsang, and religious services for every milestone of life.',
      'act.daily.eyebrow': 'Every Day',
      'act.daily.title': 'Daily Darshan & Aarti',
      'act.daily.text': 'The mandir is open every day from 8:00 AM to 8:00 PM for darshan. Visitors are welcome to join aarti, offer prayers, and sit in quiet reflection.',
      'act.daily.etiquette': 'Visiting etiquette',
      'act.daily.etiquetteText': 'Please remove shoes before entering the prayer hall, dress modestly, and keep phones on silent during aarti.',
      'act.table.caption': 'The temple is open daily, 8:00 AM – 8:00 PM.',
      'act.table.service': 'Service',
      'act.table.time': 'Time',
      'act.table.opening': 'Temple Opens',
      'act.table.closing': 'Temple Closes',
      'act.week.title': 'Weekly Schedule',
      'act.week.lead': 'Darshan and aarti happen daily. Special weekly programs are highlighted below.',
      'act.week.daily': 'Darshan & Aarti',
      'act.ramayanLong': 'Devotees gather to read the Ramayan together — verse by verse — reflecting on the ideals of dharma, devotion, and duty lived by Shri Ram, Mata Sita, Lakshman, and Hanuman. Readers of all levels are welcome to join or simply listen.',
      'act.bhajansLong': 'Friday evenings fill the mandir with music. Sing along to traditional bhajans and call-and-response kirtans in praise of Radha Krishna, Shri Ram, Shiva, and the Divine Mother. Musicians and singers are welcome to participate.',
      'act.kathaLong': 'Katha sessions bring the scriptures to life through recitation and discourse — stories from the Bhagavat Puran, Ramayan, and Bhagavad Gita, explained for modern life and followed by aarti and prasad.',
      'act.services.eyebrow': 'Religious & Community Services',
      'act.services.title': 'Services We Offer',
      'act.services.lead': `Services listed are examples. ${PH('confirm services offered, availability, and suggested dakshina')}`,
      'act.cta.title': 'Book a Puja or Ceremony',
      'act.cta.text': "Call the mandir or send us a message and we'll help you plan.",
      'svc.puja': 'Pujas & Archana',
      'svc.pujaText': 'Personal and family pujas performed at the mandir.',
      'svc.puja1': 'Satyanarayan Katha & Puja',
      'svc.puja2': 'Ganesh & Lakshmi Puja',
      'svc.puja3': 'Archana & special aarti',
      'svc.samskara': 'Samskaras & Ceremonies',
      'svc.samskaraText': "Sacred rites for life's milestones, at the temple or at home.",
      'svc.samskara1': 'Namkaran (naming ceremony)',
      'svc.samskara2': 'Annaprashan & Mundan',
      'svc.samskara3': 'Vivah (wedding) ceremonies',
      'svc.samskara4': 'Griha Pravesh (housewarming)',
      'svc.community': 'Community Services',
      'svc.communityText': 'Ways the mandir brings people together beyond worship.',
      'svc.community1': 'Prasad & community meals',
      'svc.community2': 'Festival volunteering (seva)',
      'svc.sponsor': 'Sponsorships',
      'svc.sponsorText': 'Sponsor an aarti, bhog offering, or festival in honor or memory of a loved one.',
      'svc.path': 'Path & Recitations',
      'svc.pathText': 'Arrange a Ramayan Path, Sundarkand, Hanuman Chalisa, or Gita recitation for a special occasion.',
      'svc.home': 'Home Visits by Pujari',
      'svc.homeText': 'Request a priest for pujas and ceremonies at your home.',

      /* Gallery */
      'gallery.hero.eyebrow': 'Moments of Devotion',
      'gallery.hero.title': 'Photo Gallery',
      'gallery.hero.text': 'Glimpses of darshan, festivals, and community life at the mandir.',
      'gallery.note': '<span class="placeholder">[REPLACE WITH TEMPLE PHOTOS]</span> Placeholder artwork is shown until real temple photos are added.',
      'gallery.filterLabel': 'Filter photos',
      'gallery.filter.all': 'All',
      'gallery.filter.temple': 'Temple',
      'gallery.filter.festivals': 'Festivals',
      'gallery.filter.programs': 'Programs',
      'gallery.filter.community': 'Community',
      'gallery.c1': 'Temple Entrance',
      'gallery.c2': 'Radha Krishna Darshan',
      'gallery.c3': 'Evening Aarti',
      'gallery.c4': 'Diwali Celebration',
      'gallery.c5': 'Friday Bhajans',
      'gallery.c6': 'Ramayan Path',
      'gallery.c7': 'Holi Festival',
      'gallery.c8': 'Janmashtami Decorations',
      'gallery.c9': 'Community Prasad',
      'gallery.c10': 'Navratri Garba',
      'gallery.c11': 'Katha Session',
      'gallery.c12': 'Flower Offerings',
      'gallery.share.title': 'Share Your Photos',
      'gallery.share.text': 'Captured a beautiful moment at the mandir? Send it to us to be featured in the gallery.',
      'gallery.close': 'Close image viewer',
      'gallery.prev': 'Previous image',
      'gallery.next': 'Next image',

      /* Donate */
      'donate.hero.eyebrow': 'Daan & Seva',
      'donate.hero.title': 'Support the Mandir',
      'donate.hero.text': 'Your generosity keeps the lamps lit and the doors open for every devotee.',
      'donate.how.eyebrow': 'Where Your Gift Goes',
      'donate.how.title': 'How Donations Support the Temple',
      'donate.how.lead': 'The mandir is sustained by the community. Every offering, large or small, is received with gratitude.',
      'donate.how.puja': 'Daily Puja & Bhog',
      'donate.how.pujaText': 'Flowers, ghee, lamps, and food offerings for daily worship.',
      'donate.how.festivals': 'Festivals & Programs',
      'donate.how.festivalsText': 'Celebrations, weekly satsang, katha, and cultural events.',
      'donate.how.prasad': 'Prasad & Annadanam',
      'donate.how.prasadText': 'Sharing sanctified food with devotees and the community.',
      'donate.how.upkeep': 'Temple Upkeep',
      'donate.how.upkeepText': 'Rent or maintenance, utilities, and care of the sacred space.',
      'donate.form.title': 'Make an Offering',
      'donate.form.demo': `Suggested amounts are examples only. ${PH('online payments not yet connected')}`,
      'donate.form.frequency': 'Frequency',
      'donate.form.once': 'One-time',
      'donate.form.monthly': 'Monthly',
      'donate.form.amount': 'Choose an amount (USD)',
      'donate.form.customLabel': 'Enter amount',
      'donate.form.purpose': 'Donation purpose',
      'donate.form.emailHint': 'For your receipt.',
      'donate.form.dedication': 'Dedicate this offering (optional)',
      'donate.form.dedicationPh': 'In honor or memory of…',
      'donate.form.anonymous': 'Please keep my donation anonymous in temple announcements.',
      'donate.form.total': 'Your offering',
      'donate.form.submit': 'Continue to Secure Payment',
      'donate.form.secure': 'Payments will be processed securely by our payment provider. We never store card details.',
      'donate.tier.flowers': 'Flower offering',
      'donate.tier.aarti': 'Aarti seva',
      'donate.tier.bhog': 'Bhog seva',
      'donate.tier.festival': 'Festival seva',
      'donate.tier.annadanam': 'Annadanam seva',
      'donate.tier.custom': 'Other amount',
      'donate.purpose.general': 'General temple fund',
      'donate.purpose.puja': 'Daily puja & bhog',
      'donate.purpose.festivals': 'Festivals & programs',
      'donate.purpose.annadanam': 'Prasad & annadanam',
      'donate.purpose.maintenance': 'Temple upkeep',
      'donate.other.title': 'Other Ways to Give',
      'donate.other.person': 'In person',
      'donate.other.personText': 'Visit the donation box or office at the mandir, open daily 8 AM – 8 PM.',
      'donate.other.check': 'By check',
      'donate.other.checkText': `Payable to ${PH('legal name')}, mailed to 29490 Mission Blvd, Hayward, CA 94544.`,
      'donate.other.call': 'Call us',
      'donate.other.callText': 'For sponsorships or in-kind offerings, call',
      'donate.other.digital': 'Zelle / other',
      'donate.tax.title': 'Tax Information',
      'donate.tax.text': `${PH('tax-exempt status and EIN, if applicable')} Please consult your tax advisor regarding deductibility.`,

      /* Contact */
      'contact.hero.eyebrow': 'Visit & Connect',
      'contact.hero.title': 'Contact & Directions',
      'contact.hero.text': "We'd love to welcome you. Here's how to find us and get in touch.",
      'contact.visit.eyebrow': 'Plan Your Visit',
      'contact.visit.title': 'Find the Mandir',
      'contact.address': 'Address',
      'contact.phone': 'Phone',
      'contact.hours': 'Hours',
      'contact.email': 'Email',
      'contact.form.title': 'Send Us a Message',
      'contact.form.text': "Questions about visiting, pujas, events, or volunteering? We'll get back to you.",
      'contact.tips.title': 'Visiting Tips',
      'contact.tips.shoes': 'Shoes off',
      'contact.tips.shoesText': 'Please remove footwear before entering the prayer hall.',
      'contact.tips.dress': 'Modest attire',
      'contact.tips.dressText': 'Comfortable, modest clothing is appreciated.',
      'contact.tips.parking': 'Parking',
      'contact.tips.photo': 'Photography',
      'form.name': 'Full name',
      'form.email': 'Email',
      'form.phone': 'Phone',
      'form.optional': '(optional)',
      'form.subject': 'Subject',
      'form.subject.general': 'General inquiry',
      'form.subject.puja': 'Puja / ceremony booking',
      'form.subject.events': 'Events & festivals',
      'form.subject.volunteer': 'Volunteering',
      'form.subject.donation': 'Donations',
      'form.message': 'Message',
      'form.send': 'Send Message',

      /* Strings used by JavaScript */
      'ui.openNow': 'Open now · closes 8:00 PM',
      'ui.closedNow': 'Closed now · opens 8:00 AM',
      'ui.today': 'Today',
      'ui.todayIs': 'Today · {day}',
      'ui.programToday': "Today's weekly program. Time: [PLACEHOLDER]",
      'ui.nextProgram': 'Next weekly program: {program} on {day}',
      'ui.festival': 'Festival',
      'ui.special': 'Special Event',
      'ui.dateTBA': 'Date to be announced',
      'ui.tba': 'TBA',
      'ui.tentative': 'Tentative date — [PLACEHOLDER: confirm]',
      'ui.timeTBA': 'Time: [PLACEHOLDER]',
      'ui.noEvents': 'No upcoming events in this category right now. Please check back soon.',
      'ui.imageCount': '{n} of {total}',
      'ui.errRequired': 'This field is required.',
      'ui.errEmail': 'Please enter a valid email address.',
      'ui.errAmount': 'Please enter an amount of at least $1.',
      'ui.errForm': 'Please correct the highlighted fields.',
      'ui.payNotConfigured': 'Thank you for your generosity! Online payments are not connected yet [PLACEHOLDER], so no payment has been taken. Please give in person at the mandir or call (650) 245-9500.',
      'ui.payRedirecting': 'Redirecting to secure checkout…',
      'ui.payError': 'We could not start checkout. Please try again or call (650) 245-9500.',
      'ui.contactNotConfigured': 'Thank you, {name}! Online messaging is not connected yet [PLACEHOLDER], so this message has not been sent. Please call us at (650) 245-9500.',
      'ui.contactSending': 'Sending…',
      'ui.contactSuccess': "Thank you! Your message has been sent. We'll be in touch soon.",
      'ui.contactError': 'Sorry, your message could not be sent. Please call (650) 245-9500.',
    },

    hi: {
      /* Page titles */
      'meta.home': 'हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड | हेवर्ड हिंदू मंदिर',
      'meta.about': 'हमारे बारे में | हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड',
      'meta.events': 'त्योहार और कार्यक्रम | हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड',
      'meta.activities': 'गतिविधियाँ और सेवाएँ | हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड',
      'meta.gallery': 'फोटो गैलरी | हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड',
      'meta.donate': 'दान | हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड',
      'meta.contact': 'संपर्क और मार्गदर्शन | हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड',

      /* Common / header / footer */
      'common.skip': 'मुख्य सामग्री पर जाएँ',
      'common.langToggle': 'भाषा बदलकर अंग्रेज़ी करें (Switch to English)',
      'common.menu': 'मेनू खोलें',
      'common.menuClose': 'मेनू बंद करें',
      'common.backToTop': 'ऊपर जाएँ',
      'common.giveNow': 'अभी दान करें',
      'common.viewEvents': 'कार्यक्रम देखें',
      'common.getDirections': 'रास्ता देखें',
      'top.hours': 'प्रतिदिन खुला · सुबह 8:00 – रात 8:00',
      'brand.name': 'श्री राधा कृष्ण मंदिर',
      'brand.sub': 'हरि ॐ · हेवर्ड',
      'nav.home': 'मुखपृष्ठ',
      'nav.about': 'परिचय',
      'nav.events': 'कार्यक्रम',
      'nav.activities': 'गतिविधियाँ',
      'nav.gallery': 'गैलरी',
      'nav.donate': 'दान करें',
      'nav.contact': 'संपर्क',
      'cta.title': 'मंदिर की सेवा में सहयोग करें',
      'cta.text': 'आपका हर दान दीपों को प्रज्वलित रखने, प्रसाद वितरण और सभी के लिए मंदिर के द्वार खुले रखने में सहायक है।',
      'cta.contact': 'संपर्क करें',
      'cta.message': 'संदेश भेजें',
      'footer.name': 'हरि ॐ श्री राधा कृष्ण मंदिर',
      'footer.sub': 'हेवर्ड हिंदू मंदिर',
      'footer.about': 'श्री राधा कृष्ण की भक्ति का धाम, जो हेवर्ड और ईस्ट बे के हिंदू समुदाय की सेवा करता है।',
      'footer.visit': 'हमसे मिलें',
      'footer.hours': 'प्रतिदिन खुला, सुबह 8:00 – रात 8:00',
      'footer.explore': 'अन्वेषण करें',
      'footer.trustees': 'मंदिर ट्रस्टी एवं प्रबंधन:',
      'footer.copyright': 'हरि ॐ श्री राधा कृष्ण मंदिर हेवर्ड। सर्वाधिकार सुरक्षित।',

      /* Days */
      'day.sunday': 'रविवार',
      'day.monday': 'सोमवार',
      'day.tuesday': 'मंगलवार',
      'day.wednesday': 'बुधवार',
      'day.thursday': 'गुरुवार',
      'day.friday': 'शुक्रवार',
      'day.saturday': 'शनिवार',
      'day.tueShort': 'मंगल',
      'day.friShort': 'शुक्र',
      'day.every': 'हर',
      'day.weekly': 'साप्ताहिक',
      'day.regular': 'नियमित',
      'day.sessions': 'सत्र',

      /* Timings */
      'time.darshan': 'दर्शन',
      'time.morningAarti': 'प्रातः आरती',
      'time.eveningAarti': 'संध्या आरती',

      /* Weekly programs */
      'programs.eyebrow': 'हर सप्ताह',
      'programs.title': 'साप्ताहिक कार्यक्रम',
      'programs.lead': 'शास्त्र, संगीत और सत्संग के लिए संगत में शामिल हों। सभी का स्वागत है — पंजीकरण की आवश्यकता नहीं।',
      'programs.regular': 'नियमित सत्र',
      'programs.ramayan': 'रामायण पाठ',
      'programs.ramayanText': 'श्री राम की पावन कथा — रामायण — का भक्तिभाव से सामूहिक पाठ।',
      'programs.bhajans': 'भजन और कीर्तन',
      'programs.bhajansText': 'हारमोनियम, ढोलक और करताल के साथ भक्ति संगीत की संध्या। आइए, प्रभु का नाम मिलकर गाएँ।',
      'programs.katha': 'कथा',
      'programs.kathaText': 'पवित्र शास्त्रों का पाठ और प्रवचन — दैनिक जीवन के लिए शाश्वत शिक्षाएँ।',

      /* Home */
      'home.hero.eyebrow': 'हेवर्ड हिंदू मंदिर',
      'home.hero.title': 'हरि ॐ श्री राधा कृष्ण मंदिर',
      'home.hero.place': 'हेवर्ड, कैलिफ़ोर्निया',
      'home.hero.tagline': 'भक्ति, सेवा और समुदाय का पावन धाम — जहाँ हर आगंतुक का स्वागत श्री राधा कृष्ण के प्रेम से होता है।',
      'home.hero.cta1': 'दर्शन की योजना बनाएँ',
      'home.hero.cta2': 'आगामी कार्यक्रम',
      'glance.hoursTitle': 'मंदिर का समय',
      'glance.open': 'प्रतिदिन खुला',
      'glance.hoursNote': 'सप्ताह के सातों दिन खुला। सभी का स्वागत है।',
      'glance.aartiTitle': 'दर्शन और आरती',
      'glance.todayTitle': 'आज मंदिर में',
      'glance.thisWeek': 'इस सप्ताह',
      'glance.defaultProgram': 'दैनिक दर्शन और आरती',
      'glance.defaultNote': 'मंगलवार: रामायण पाठ · शुक्रवार: भजन और कीर्तन',
      'glance.fullSchedule': 'पूरा कार्यक्रम देखें',
      'home.quick.eyebrow': 'योजना बनाएँ और भाग लें',
      'home.quick.title': 'अपनी यात्रा आरंभ करें',
      'home.quick.events': 'त्योहार और कार्यक्रम',
      'home.quick.eventsText': 'दीपावली, नवरात्रि, होली, जन्माष्टमी और अन्य पर्व समुदाय के साथ मनाएँ।',
      'home.quick.donate': 'दान और सेवा',
      'home.quick.donateText': 'आपका दान दैनिक पूजा, प्रसाद, त्योहारों और हमारे साझा मंदिर को संबल देता है।',
      'home.quick.visit': 'पता और मार्गदर्शन',
      'home.quick.visitText': '29490 Mission Blvd, हेवर्ड। रास्ता, पार्किंग संबंधी जानकारी और हम तक पहुँचने का तरीका जानें।',
      'home.welcome.eyebrow': 'स्वागत है',
      'home.welcome.title': 'हर भक्त के लिए एक आध्यात्मिक घर',
      'home.welcome.p1': 'हरि ॐ श्री राधा कृष्ण मंदिर — जिसे स्थानीय रूप से हेवर्ड हिंदू मंदिर के नाम से जाना जाता है — प्रार्थना, शांति और एकता का स्थान है। श्री राधा कृष्ण हमारे प्रमुख आराध्य हैं, और यह मंदिर हेवर्ड तथा ईस्ट बे के संपूर्ण हिंदू समुदाय की सेवा करता है।',
      'home.welcome.p2': 'हमारा उद्देश्य सरल है: दैनिक पूजा, शास्त्र, भजन और सेवा के माध्यम से भक्ति का दीप जलाए रखना — और परिवारों को ऐसा स्थान देना जहाँ हमारी परंपराएँ जी जाएँ, मनाई जाएँ और आगे बढ़ाई जाएँ।',
      'home.welcome.quote': '“जो कोई भक्तिपूर्वक मुझे पत्र, पुष्प, फल या जल अर्पित करता है — उस प्रेमपूर्ण अर्पण को मैं स्वीकार करता हूँ।”',
      'home.welcome.cite': '— भगवद्गीता 9.26',
      'home.welcome.cta': 'मंदिर के बारे में जानें',
      'home.stat1': 'प्रतिदिन खुला',
      'home.stat2': 'सभी का स्वागत है',
      'home.stat2sub': 'परिवार और आगंतुक',
      'home.upcoming.eyebrow': 'साथ मिलकर उत्सव मनाएँ',
      'home.upcoming.title': 'आगामी त्योहार',
      'home.upcoming.cta': 'सभी कार्यक्रम देखें',

      /* About */
      'about.hero.eyebrow': 'मंदिर का परिचय',
      'about.hero.title': 'हमारा मंदिर और हमारी आस्था',
      'about.hero.text': 'भक्ति में निहित, सभी के लिए खुला — हमारी कहानी, हमारे आराध्य और वे मूल्य जो हमारे समुदाय का मार्गदर्शन करते हैं।',
      'about.history.eyebrow': 'हमारी कहानी',
      'about.history.title': 'इतिहास और उद्देश्य',
      'about.history.p1': `हरि ॐ श्री राधा कृष्ण मंदिर — हेवर्ड हिंदू मंदिर — की स्थापना ${PH('founding year')} में ${PH('founding families / organization')} द्वारा की गई, ताकि स्थानीय भक्तों को साथ मिलकर पूजा करने का स्थान मिल सके।`,
      'about.history.p2': PH('2–3 sentences on how the temple began, its first home, and how it came to 29490 Mission Blvd.'),
      'about.history.p3': 'हमारा उद्देश्य श्री राधा कृष्ण के प्रति भक्ति को पोषित करना, सनातन धर्म की परंपराओं को अगली पीढ़ी तक पहुँचाना, और संपूर्ण हिंदू समुदाय के लिए — चाहे उनका क्षेत्र, भाषा या परंपरा कोई भी हो — एक स्नेहपूर्ण आध्यात्मिक घर बनना है।',
      'about.timeline.title': 'प्रमुख पड़ाव',
      'about.timeline.1': 'समुदाय द्वारा मंदिर की स्थापना',
      'about.timeline.2': 'श्री राधा कृष्ण की प्राण प्रतिष्ठा',
      'about.timeline.3': 'साप्ताहिक रामायण पाठ और भजन कार्यक्रमों का आरंभ',
      'about.deities.eyebrow': 'प्रमुख आराध्य',
      'about.deities.title': 'मंदिर में दिव्य उपस्थिति',
      'about.deities.note': `व्यापक हिंदू समुदाय की सेवा में, मंदिर में अन्य प्रिय देवी-देवताओं की भी आराधना होती है। ${PH('confirm which murtis are installed')}`,
      'about.rk.eyebrow': 'मुख्य आराध्य',
      'about.rk.title': 'श्री राधा कृष्ण',
      'about.rk.p1': 'वृंदावन के प्रिय श्री कृष्ण और शुद्ध भक्ति की स्वरूपा श्री राधा हमारे मंदिर का हृदय हैं। दोनों मिलकर दिव्य प्रेम — आत्मा और परमात्मा के शाश्वत संबंध — का प्रतीक हैं।',
      'about.rk.p2': 'भक्त दर्शन करने, पुष्प और प्रसाद अर्पित करने, कीर्तन में उनका नाम गाने और उनकी उपस्थिति में शांति पाने आते हैं। जन्माष्टमी, राधा अष्टमी, होली और गोवर्धन पूजा पर विशेष उत्सव होते हैं।',
      'about.rk.note': PH('details about the murtis — e.g., origin, installation date, adornment traditions'),
      'deity.shiva': 'भगवान शिव',
      'deity.shivaText': 'कल्याणकारी महादेव — विशेषकर सोमवार और महाशिवरात्रि पर अभिषेक द्वारा पूजित।',
      'deity.hanuman': 'श्री हनुमान',
      'deity.hanumanText': 'श्री राम के परम भक्त, शक्ति और साहस के प्रतीक — हनुमान चालीसा से पूजित।',
      'deity.durga': 'दुर्गा माता',
      'deity.durgaText': 'भक्तों की रक्षा करने वाली जगतजननी — नवरात्रि में बड़े उल्लास से पूजित।',
      'deity.ganesh': 'श्री गणेश',
      'deity.ganeshText': 'विघ्नहर्ता, हर पूजा और हर शुभ आरंभ में सबसे पहले पूजित।',
      'about.values.eyebrow': 'हमारे मार्गदर्शक',
      'about.values.title': 'हमारे मूल्य और समुदाय',
      'values.bhakti': 'भक्ति',
      'values.bhaktiText': 'पूजा, कीर्तन और प्रार्थना के माध्यम से प्रभु के प्रति प्रेमपूर्ण समर्पण।',
      'values.seva': 'सेवा',
      'values.sevaText': 'मंदिर और दूसरों की निःस्वार्थ सेवा — प्रसाद बनाने से लेकर पड़ोसियों की सहायता तक।',
      'values.sanskriti': 'संस्कृति',
      'values.sanskritiText': 'शास्त्र, भाषा, संगीत और त्योहारों का संरक्षण, ताकि हमारी विरासत हमारे बच्चों में जीवित रहे।',
      'values.sangha': 'संघ',
      'values.sanghaText': 'एक स्नेहपूर्ण, समावेशी समुदाय जहाँ हर परिवार और आगंतुक अपनापन महसूस करे।',
      'about.mgmt.title': 'मंदिर प्रबंधन',
      'about.mgmt.text': 'मंदिर का संचालन स्वयंसेवकों और ट्रस्टियों की एक समर्पित समिति द्वारा किया जाता है।',
      'about.mgmt.president': 'अध्यक्ष',
      'about.mgmt.secretary': 'सचिव',
      'about.mgmt.treasurer': 'कोषाध्यक्ष',
      'about.mgmt.priest': 'पुजारी',
      'about.social.title': 'फेसबुक पर हमसे जुड़ें',
      'about.social.text': 'मंदिर के कार्यक्रमों की तस्वीरें, घोषणाएँ और समाचार देखें।',
      'about.social.cta': 'हमारा फेसबुक पेज देखें',
      'about.join.title': 'सेवा में जुड़ें',
      'about.join.text': 'त्योहारों में स्वयंसेवा करें, प्रसाद में सहायता करें, भजन मंडली में शामिल हों या पूजा प्रायोजित करें। सेवा में सभी के लिए स्थान है।',
      'about.guru.eyebrow': 'हमारे आध्यात्मिक मार्गदर्शक',
      'about.guru.title': 'जगतगुरु स्वामीजी महाराज',
      'about.guru.name': 'जगतगुरु स्वामी इंद्रविजय नारायण जी सूर्यवंशी अखाड़ा',
      'about.guru.bio': PH('biography — spiritual lineage, teachings, and role at the mandir'),
      'about.guru.cta': 'मंदिर में आशीर्वाद प्राप्त करें',
      'blessing.with': 'आशीर्वाद एवं स्नेह',
      'gallery.altar': 'मंदिर का पूजा स्थल',

      /* Home — Stay connected */
      'home.connect.eyebrow': 'जुड़े रहें',
      'home.connect.title': 'मंदिर परिवार का हिस्सा बनें',
      'home.connect.lead': 'समाचार पाएँ, सेवा में हाथ बँटाएँ और ऑनलाइन जुड़े रहें।',
      'home.connect.whatsapp': 'मंदिर व्हाट्सऐप से जुड़ें',
      'home.connect.whatsappText': 'आरती, त्योहारों और कार्यक्रमों की सूचनाएँ सीधे अपने फ़ोन पर पाएँ।',
      'home.connect.whatsappCta': 'व्हाट्सऐप ग्रुप से जुड़ें',
      'home.connect.volunteer': 'स्वयंसेवक बनें',
      'home.connect.volunteerText': 'त्योहारों, प्रसाद, सजावट और दैनिक सेवा में सहायता करें। हर सहयोग एक आशीर्वाद है।',
      'home.connect.volunteerCta': 'स्वयंसेवा हेतु पंजीकरण',
      'home.connect.social': 'हमें फ़ॉलो करें',
      'home.connect.socialText': 'यूट्यूब पर भजन और कथा देखें तथा फ़ेसबुक पर मंदिर के समाचार और तस्वीरें देखें।',

      /* Events */
      'events.hero.eyebrow': 'उत्सव और सत्संग',
      'events.hero.title': 'त्योहार और कार्यक्रम',
      'events.hero.text': 'मंदिर परिवार के साथ पावन पंचांग के पर्व मनाएँ — साप्ताहिक सत्संग से लेकर भव्य त्योहारों तक।',
      'events.weekly.eyebrow': 'नियमित',
      'events.tag.weekly': 'साप्ताहिक',
      'events.tag.recurring': 'नियमित',
      'events.upcoming.eyebrow': 'तिथियाँ नोट करें',
      'events.upcoming.title': 'आगामी त्योहार और विशेष कार्यक्रम',
      'events.upcoming.note': `त्योहारों की तिथियाँ हिंदू चंद्र पंचांग पर आधारित हैं। दर्शाई गई तिथियाँ संभावित हैं ${PH('confirm with temple committee')}।`,
      'events.filterLabel': 'कार्यक्रम छाँटें',
      'events.filter.all': 'सभी',
      'events.filter.festival': 'त्योहार',
      'events.filter.special': 'विशेष कार्यक्रम',
      'events.cta.title': 'त्योहार पूजा प्रायोजित करें',
      'events.cta.text': 'परिवार अपने प्रियजनों के सम्मान में आरती, भोग या त्योहार उत्सव प्रायोजित कर सकते हैं।',

      /* Activities */
      'act.hero.eyebrow': 'पूजा और सेवा',
      'act.hero.title': 'गतिविधियाँ और सेवाएँ',
      'act.hero.text': 'दैनिक दर्शन, साप्ताहिक सत्संग और जीवन के हर पड़ाव के लिए धार्मिक सेवाएँ।',
      'act.daily.eyebrow': 'प्रतिदिन',
      'act.daily.title': 'दैनिक दर्शन और आरती',
      'act.daily.text': 'मंदिर दर्शन के लिए प्रतिदिन सुबह 8:00 से रात 8:00 बजे तक खुला रहता है। आगंतुक आरती में शामिल होने, प्रार्थना करने और शांत चिंतन के लिए सादर आमंत्रित हैं।',
      'act.daily.etiquette': 'दर्शन के नियम',
      'act.daily.etiquetteText': 'कृपया प्रार्थना कक्ष में प्रवेश से पहले जूते उतारें, शालीन वस्त्र पहनें और आरती के समय फ़ोन साइलेंट रखें।',
      'act.table.caption': 'मंदिर प्रतिदिन सुबह 8:00 से रात 8:00 बजे तक खुला रहता है।',
      'act.table.service': 'सेवा',
      'act.table.time': 'समय',
      'act.table.opening': 'मंदिर खुलता है',
      'act.table.closing': 'मंदिर बंद होता है',
      'act.week.title': 'साप्ताहिक समय-सारणी',
      'act.week.lead': 'दर्शन और आरती प्रतिदिन होते हैं। विशेष साप्ताहिक कार्यक्रम नीचे दर्शाए गए हैं।',
      'act.week.daily': 'दर्शन और आरती',
      'act.ramayanLong': 'भक्त मिलकर रामायण का पाठ करते हैं — चौपाई दर चौपाई — और श्री राम, माता सीता, लक्ष्मण और हनुमान जी द्वारा जिए गए धर्म, भक्ति और कर्तव्य के आदर्शों पर मनन करते हैं। हर स्तर के पाठक शामिल हो सकते हैं या केवल श्रवण कर सकते हैं।',
      'act.bhajansLong': 'शुक्रवार की संध्या मंदिर संगीत से गूँज उठता है। राधा कृष्ण, श्री राम, शिव और जगदंबा की स्तुति में पारंपरिक भजन और कीर्तन मिलकर गाएँ। संगीतकारों और गायकों का स्वागत है।',
      'act.kathaLong': 'कथा सत्रों में पाठ और प्रवचन के माध्यम से शास्त्र जीवंत हो उठते हैं — भागवत पुराण, रामायण और भगवद्गीता की कथाएँ, आधुनिक जीवन के संदर्भ में, जिसके बाद आरती और प्रसाद होता है।',
      'act.services.eyebrow': 'धार्मिक और सामुदायिक सेवाएँ',
      'act.services.title': 'हमारी सेवाएँ',
      'act.services.lead': `सूचीबद्ध सेवाएँ उदाहरण मात्र हैं। ${PH('confirm services offered, availability, and suggested dakshina')}`,
      'act.cta.title': 'पूजा या संस्कार बुक करें',
      'act.cta.text': 'मंदिर को फ़ोन करें या संदेश भेजें — हम आपकी योजना में सहायता करेंगे।',
      'svc.puja': 'पूजा और अर्चना',
      'svc.pujaText': 'मंदिर में संपन्न होने वाली व्यक्तिगत और पारिवारिक पूजाएँ।',
      'svc.puja1': 'सत्यनारायण कथा और पूजा',
      'svc.puja2': 'गणेश और लक्ष्मी पूजा',
      'svc.puja3': 'अर्चना और विशेष आरती',
      'svc.samskara': 'संस्कार और अनुष्ठान',
      'svc.samskaraText': 'जीवन के महत्वपूर्ण पड़ावों के पवित्र संस्कार, मंदिर में या घर पर।',
      'svc.samskara1': 'नामकरण संस्कार',
      'svc.samskara2': 'अन्नप्राशन और मुंडन',
      'svc.samskara3': 'विवाह संस्कार',
      'svc.samskara4': 'गृह प्रवेश',
      'svc.community': 'सामुदायिक सेवाएँ',
      'svc.communityText': 'पूजा से आगे बढ़कर मंदिर लोगों को जोड़ने के तरीके।',
      'svc.community1': 'प्रसाद और सामुदायिक भोजन',
      'svc.community2': 'त्योहारों में स्वयंसेवा (सेवा)',
      'svc.sponsor': 'प्रायोजन',
      'svc.sponsorText': 'किसी प्रियजन के सम्मान या स्मृति में आरती, भोग या त्योहार प्रायोजित करें।',
      'svc.path': 'पाठ और स्तुति',
      'svc.pathText': 'विशेष अवसर के लिए रामायण पाठ, सुंदरकांड, हनुमान चालीसा या गीता पाठ का आयोजन करें।',
      'svc.home': 'घर पर पुजारी सेवा',
      'svc.homeText': 'अपने घर पर पूजा और संस्कारों के लिए पुजारी जी को आमंत्रित करें।',

      /* Gallery */
      'gallery.hero.eyebrow': 'भक्ति के क्षण',
      'gallery.hero.title': 'फोटो गैलरी',
      'gallery.hero.text': 'मंदिर में दर्शन, त्योहारों और सामुदायिक जीवन की झलकियाँ।',
      'gallery.note': '<span class="placeholder">[REPLACE WITH TEMPLE PHOTOS]</span> मंदिर की वास्तविक तस्वीरें जोड़े जाने तक प्रतीकात्मक चित्र दिखाए जा रहे हैं।',
      'gallery.filterLabel': 'तस्वीरें छाँटें',
      'gallery.filter.all': 'सभी',
      'gallery.filter.temple': 'मंदिर',
      'gallery.filter.festivals': 'त्योहार',
      'gallery.filter.programs': 'कार्यक्रम',
      'gallery.filter.community': 'समुदाय',
      'gallery.c1': 'मंदिर प्रवेश द्वार',
      'gallery.c2': 'राधा कृष्ण दर्शन',
      'gallery.c3': 'संध्या आरती',
      'gallery.c4': 'दीपावली उत्सव',
      'gallery.c5': 'शुक्रवार भजन',
      'gallery.c6': 'रामायण पाठ',
      'gallery.c7': 'होली उत्सव',
      'gallery.c8': 'जन्माष्टमी सजावट',
      'gallery.c9': 'सामुदायिक प्रसाद',
      'gallery.c10': 'नवरात्रि गरबा',
      'gallery.c11': 'कथा सत्र',
      'gallery.c12': 'पुष्प अर्पण',
      'gallery.share.title': 'अपनी तस्वीरें साझा करें',
      'gallery.share.text': 'मंदिर में कोई सुंदर क्षण कैमरे में कैद किया है? गैलरी में शामिल करने के लिए हमें भेजें।',
      'gallery.close': 'चित्र दर्शक बंद करें',
      'gallery.prev': 'पिछला चित्र',
      'gallery.next': 'अगला चित्र',

      /* Donate */
      'donate.hero.eyebrow': 'दान और सेवा',
      'donate.hero.title': 'मंदिर को सहयोग दें',
      'donate.hero.text': 'आपकी उदारता दीपों को प्रज्वलित और हर भक्त के लिए द्वार खुले रखती है।',
      'donate.how.eyebrow': 'आपका दान कहाँ जाता है',
      'donate.how.title': 'दान से मंदिर को कैसे सहायता मिलती है',
      'donate.how.lead': 'मंदिर समुदाय के सहयोग से चलता है। छोटा हो या बड़ा, हर दान कृतज्ञता के साथ स्वीकार किया जाता है।',
      'donate.how.puja': 'दैनिक पूजा और भोग',
      'donate.how.pujaText': 'दैनिक पूजा के लिए पुष्प, घी, दीप और भोग सामग्री।',
      'donate.how.festivals': 'त्योहार और कार्यक्रम',
      'donate.how.festivalsText': 'उत्सव, साप्ताहिक सत्संग, कथा और सांस्कृतिक कार्यक्रम।',
      'donate.how.prasad': 'प्रसाद और अन्नदान',
      'donate.how.prasadText': 'भक्तों और समुदाय के साथ पवित्र प्रसाद बाँटना।',
      'donate.how.upkeep': 'मंदिर रखरखाव',
      'donate.how.upkeepText': 'किराया या रखरखाव, बिजली-पानी और पवित्र स्थान की देखभाल।',
      'donate.form.title': 'दान अर्पित करें',
      'donate.form.demo': `सुझाई गई राशियाँ केवल उदाहरण हैं। ${PH('online payments not yet connected')}`,
      'donate.form.frequency': 'आवृत्ति',
      'donate.form.once': 'एक बार',
      'donate.form.monthly': 'मासिक',
      'donate.form.amount': 'राशि चुनें (USD)',
      'donate.form.customLabel': 'राशि दर्ज करें',
      'donate.form.purpose': 'दान का उद्देश्य',
      'donate.form.emailHint': 'आपकी रसीद के लिए।',
      'donate.form.dedication': 'यह दान समर्पित करें (वैकल्पिक)',
      'donate.form.dedicationPh': 'किसी के सम्मान या स्मृति में…',
      'donate.form.anonymous': 'कृपया मंदिर की घोषणाओं में मेरा दान गुप्त रखें।',
      'donate.form.total': 'आपका दान',
      'donate.form.submit': 'सुरक्षित भुगतान के लिए आगे बढ़ें',
      'donate.form.secure': 'भुगतान हमारे भुगतान प्रदाता द्वारा सुरक्षित रूप से संसाधित होगा। हम कार्ड विवरण कभी संग्रहित नहीं करते।',
      'donate.tier.flowers': 'पुष्प अर्पण',
      'donate.tier.aarti': 'आरती सेवा',
      'donate.tier.bhog': 'भोग सेवा',
      'donate.tier.festival': 'त्योहार सेवा',
      'donate.tier.annadanam': 'अन्नदान सेवा',
      'donate.tier.custom': 'अन्य राशि',
      'donate.purpose.general': 'सामान्य मंदिर कोष',
      'donate.purpose.puja': 'दैनिक पूजा और भोग',
      'donate.purpose.festivals': 'त्योहार और कार्यक्रम',
      'donate.purpose.annadanam': 'प्रसाद और अन्नदान',
      'donate.purpose.maintenance': 'मंदिर रखरखाव',
      'donate.other.title': 'दान के अन्य तरीके',
      'donate.other.person': 'स्वयं आकर',
      'donate.other.personText': 'मंदिर में दान पेटी या कार्यालय में दान करें — प्रतिदिन सुबह 8 से रात 8 बजे तक।',
      'donate.other.check': 'चेक द्वारा',
      'donate.other.checkText': `${PH('legal name')} के नाम देय, 29490 Mission Blvd, Hayward, CA 94544 पर डाक द्वारा भेजें।`,
      'donate.other.call': 'फ़ोन करें',
      'donate.other.callText': 'प्रायोजन या वस्तु-दान के लिए फ़ोन करें',
      'donate.other.digital': 'Zelle / अन्य',
      'donate.tax.title': 'कर संबंधी जानकारी',
      'donate.tax.text': `${PH('tax-exempt status and EIN, if applicable')} कर-कटौती के विषय में कृपया अपने कर सलाहकार से परामर्श करें।`,

      /* Contact */
      'contact.hero.eyebrow': 'आइए और जुड़ें',
      'contact.hero.title': 'संपर्क और मार्गदर्शन',
      'contact.hero.text': 'आपका स्वागत करना हमारे लिए सौभाग्य होगा। हम तक पहुँचने और संपर्क करने का तरीका यहाँ है।',
      'contact.visit.eyebrow': 'दर्शन की योजना बनाएँ',
      'contact.visit.title': 'मंदिर का पता',
      'contact.address': 'पता',
      'contact.phone': 'फ़ोन',
      'contact.hours': 'समय',
      'contact.email': 'ईमेल',
      'contact.form.title': 'हमें संदेश भेजें',
      'contact.form.text': 'दर्शन, पूजा, कार्यक्रम या स्वयंसेवा के बारे में प्रश्न हैं? हम आपसे संपर्क करेंगे।',
      'contact.tips.title': 'दर्शन हेतु सुझाव',
      'contact.tips.shoes': 'जूते बाहर उतारें',
      'contact.tips.shoesText': 'कृपया प्रार्थना कक्ष में प्रवेश से पहले जूते-चप्पल उतार दें।',
      'contact.tips.dress': 'शालीन वस्त्र',
      'contact.tips.dressText': 'आरामदायक और शालीन वस्त्र पहनें।',
      'contact.tips.parking': 'पार्किंग',
      'contact.tips.photo': 'फ़ोटोग्राफ़ी',
      'form.name': 'पूरा नाम',
      'form.email': 'ईमेल',
      'form.phone': 'फ़ोन',
      'form.optional': '(वैकल्पिक)',
      'form.subject': 'विषय',
      'form.subject.general': 'सामान्य पूछताछ',
      'form.subject.puja': 'पूजा / संस्कार बुकिंग',
      'form.subject.events': 'कार्यक्रम और त्योहार',
      'form.subject.volunteer': 'स्वयंसेवा',
      'form.subject.donation': 'दान',
      'form.message': 'संदेश',
      'form.send': 'संदेश भेजें',

      /* Strings used by JavaScript */
      'ui.openNow': 'अभी खुला है · रात 8:00 बजे बंद होगा',
      'ui.closedNow': 'अभी बंद है · सुबह 8:00 बजे खुलेगा',
      'ui.today': 'आज',
      'ui.todayIs': 'आज · {day}',
      'ui.programToday': 'आज का साप्ताहिक कार्यक्रम। समय: [PLACEHOLDER]',
      'ui.nextProgram': 'अगला साप्ताहिक कार्यक्रम: {day} को {program}',
      'ui.festival': 'त्योहार',
      'ui.special': 'विशेष कार्यक्रम',
      'ui.dateTBA': 'तिथि की घोषणा बाद में होगी',
      'ui.tba': 'शीघ्र',
      'ui.tentative': 'संभावित तिथि — [PLACEHOLDER: confirm]',
      'ui.timeTBA': 'समय: [PLACEHOLDER]',
      'ui.noEvents': 'इस श्रेणी में अभी कोई आगामी कार्यक्रम नहीं है। कृपया बाद में देखें।',
      'ui.imageCount': '{total} में से {n}',
      'ui.errRequired': 'यह जानकारी आवश्यक है।',
      'ui.errEmail': 'कृपया मान्य ईमेल पता दर्ज करें।',
      'ui.errAmount': 'कृपया कम से कम $1 की राशि दर्ज करें।',
      'ui.errForm': 'कृपया चिह्नित जानकारी ठीक करें।',
      'ui.payNotConfigured': 'आपकी उदारता के लिए धन्यवाद! ऑनलाइन भुगतान अभी जुड़ा नहीं है [PLACEHOLDER], इसलिए कोई भुगतान नहीं लिया गया है। कृपया मंदिर में आकर दान करें या (650) 245-9500 पर फ़ोन करें।',
      'ui.payRedirecting': 'सुरक्षित भुगतान पृष्ठ पर ले जाया जा रहा है…',
      'ui.payError': 'भुगतान आरंभ नहीं हो सका। कृपया पुनः प्रयास करें या (650) 245-9500 पर फ़ोन करें।',
      'ui.contactNotConfigured': 'धन्यवाद, {name}! ऑनलाइन संदेश सेवा अभी जुड़ी नहीं है [PLACEHOLDER], इसलिए यह संदेश नहीं भेजा गया है। कृपया (650) 245-9500 पर फ़ोन करें।',
      'ui.contactSending': 'भेजा जा रहा है…',
      'ui.contactSuccess': 'धन्यवाद! आपका संदेश भेज दिया गया है। हम शीघ्र संपर्क करेंगे।',
      'ui.contactError': 'क्षमा करें, आपका संदेश नहीं भेजा जा सका। कृपया (650) 245-9500 पर फ़ोन करें।',
    },
  };

  /* ------------------------------------------------------------------------
     2. EVENTS DATA
     ------------------------------------------------------------------------
     Edit this list to add/remove festivals and special events.
     • date:      'YYYY-MM-DD' (Pacific time) — or null for "date to be announced"
     • type:      'festival' | 'special'
     • tentative: true shows a "[PLACEHOLDER: confirm]" note. Set false once the
                  committee confirms the date against the panchang.
     • time:      optional { en, hi } — omit to show a time placeholder
     Past events are hidden automatically.
     ------------------------------------------------------------------------ */
  const EVENTS = [
    { date: '2026-09-14', type: 'festival', tentative: false,
      title: { en: 'Hartalika Teej & Ganesh Chaturthi', hi: 'हरतालिका तीज एवं गणेश चतुर्थी' },
      time: { en: '7:00 PM', hi: 'शाम 7:00 बजे' },
      desc: { en: 'A celebration of devotion, love and blessings. Come together to seek the blessings of Maa Parvati, Lord Ganesha and Lord Shiva for happiness, prosperity and peace in our lives.', hi: 'भक्ति, प्रेम और आशीर्वाद का उत्सव। अपने जीवन में सुख, समृद्धि और शांति के लिए माँ पार्वती, भगवान गणेश और भगवान शिव का आशीर्वाद पाने हेतु साथ आएँ।' },
      highlights: { en: 'Poojan · Katha · Bhajan · Aarti · Prasad', hi: 'पूजन · कथा · भजन · आरती · प्रसाद' },
      note: { en: 'Blessings and love from JagatGuru Swami Indravijay Narayan Ji Suryavanshi Akhada', hi: 'जगतगुरु स्वामी इंद्रविजय नारायण जी सूर्यवंशी अखाड़ा की ओर से आशीर्वाद एवं स्नेह' },
      phones: ['(916) 689-5000', '(650) 245-9500'],
      image: {
        src: 'assets/images/events/hartalika-teej-ganesh-chaturthi-2026-thumb.jpg',
        full: 'assets/images/events/hartalika-teej-ganesh-chaturthi-2026.jpg',
        alt: { en: 'Event flyer: Hartalika Teej and Ganesh Chaturthi, Monday, September 14, 2026 at 7:00 PM, at Hari Om Shri Radha Krishna Mandir, Hayward', hi: 'कार्यक्रम पोस्टर: हरतालिका तीज एवं गणेश चतुर्थी, सोमवार, 14 सितंबर 2026, शाम 7:00 बजे, हरि ॐ श्री राधा कृष्ण मंदिर, हेवर्ड' },
      } },
    { date: '2026-09-19', type: 'festival', tentative: true,
      title: { en: 'Radha Ashtami', hi: 'राधा अष्टमी' },
      desc: { en: 'Celebrating the divine appearance of Shri Radha Rani with abhishek, bhajans, and prasad.', hi: 'श्री राधा रानी के प्राकट्य उत्सव पर अभिषेक, भजन और प्रसाद।' } },
    { date: '2026-10-11', type: 'festival', tentative: true,
      title: { en: 'Sharad Navratri Begins', hi: 'शारदीय नवरात्रि आरंभ' },
      desc: { en: 'Nine nights honoring Durga Mata with daily puja, aarti, and garba.', hi: 'नौ रातों तक दुर्गा माता की पूजा, आरती और गरबा।' } },
    { date: '2026-10-20', type: 'festival', tentative: true,
      title: { en: 'Dussehra (Vijayadashami)', hi: 'दशहरा (विजयादशमी)' },
      desc: { en: "The victory of good over evil — Shri Ram's triumph celebrated with puja and community gathering.", hi: 'असत्य पर सत्य की विजय — श्री राम की विजय का उत्सव, पूजा और सामूहिक समारोह के साथ।' } },
    { date: '2026-10-25', type: 'festival', tentative: true,
      title: { en: 'Sharad Purnima', hi: 'शरद पूर्णिमा' },
      desc: { en: 'A full-moon night of devotion with kheer prasad and kirtan.', hi: 'खीर प्रसाद और कीर्तन के साथ पूर्णिमा की भक्तिमय रात।' } },
    { date: '2026-11-08', type: 'festival', tentative: true,
      title: { en: 'Diwali — Lakshmi Puja', hi: 'दीपावली — लक्ष्मी पूजा' },
      desc: { en: 'The festival of lights with Lakshmi-Ganesh puja, diyas, and sweets for the whole family.', hi: 'लक्ष्मी-गणेश पूजा, दीयों और मिठाइयों के साथ प्रकाश का पर्व।' } },
    { date: '2026-11-09', type: 'festival', tentative: true,
      title: { en: 'Govardhan Puja & Annakut', hi: 'गोवर्धन पूजा एवं अन्नकूट' },
      desc: { en: "Honoring Shri Krishna's lifting of Govardhan Hill with a grand food offering (Annakut).", hi: 'श्री कृष्ण द्वारा गोवर्धन पर्वत उठाने की स्मृति में भव्य अन्नकूट भोग।' } },
    { date: '2026-12-20', type: 'festival', tentative: true,
      title: { en: 'Gita Jayanti', hi: 'गीता जयंती' },
      desc: { en: 'Celebrating the day the Bhagavad Gita was spoken, with recitation of its verses.', hi: 'भगवद्गीता के उपदेश दिवस पर गीता पाठ।' } },
    { date: '2027-01-14', type: 'festival', tentative: true,
      title: { en: 'Makar Sankranti', hi: 'मकर संक्रांति' },
      desc: { en: "Harvest festival marking the sun's northward journey, with til-gud sweets and prayers.", hi: 'सूर्य के उत्तरायण होने का पर्व — तिल-गुड़ और प्रार्थना के साथ।' } },
    { date: '2027-02-11', type: 'festival', tentative: true,
      title: { en: 'Vasant Panchami', hi: 'वसंत पंचमी' },
      desc: { en: 'Welcoming spring and honoring Saraswati Mata, goddess of learning.', hi: 'वसंत के स्वागत और विद्या की देवी सरस्वती माता की पूजा।' } },
    { date: '2027-03-06', type: 'festival', tentative: true,
      title: { en: 'Maha Shivratri', hi: 'महाशिवरात्रि' },
      desc: { en: 'A night of worship dedicated to Lord Shiva with abhishek and chanting.', hi: 'अभिषेक और मंत्रोच्चार के साथ भगवान शिव की आराधना की रात।' } },
    { date: '2027-03-22', type: 'festival', tentative: true,
      title: { en: 'Holi', hi: 'होली' },
      desc: { en: "The festival of colors and Radha Krishna's divine love — bhajans, colors, and joy.", hi: 'रंगों का त्योहार और राधा कृष्ण का दिव्य प्रेम — भजन, रंग और आनंद।' } },
    { date: '2027-04-15', type: 'festival', tentative: true,
      title: { en: 'Ram Navami', hi: 'राम नवमी' },
      desc: { en: 'Celebrating the birth of Shri Ram with Ramayan recitation and bhajans.', hi: 'रामायण पाठ और भजनों के साथ श्री राम जन्मोत्सव।' } },
    { date: '2027-04-20', type: 'festival', tentative: true,
      title: { en: 'Hanuman Jayanti', hi: 'हनुमान जयंती' },
      desc: { en: 'Honoring Shri Hanuman with Hanuman Chalisa and Sundarkand path.', hi: 'हनुमान चालीसा और सुंदरकांड पाठ के साथ श्री हनुमान जयंती।' } },
    { date: null, type: 'special', tentative: true,
      title: { en: 'Temple Anniversary Celebration', hi: 'मंदिर स्थापना वर्षगाँठ उत्सव' },
      desc: { en: 'Annual celebration of the mandir’s founding. [PLACEHOLDER: date & program details]', hi: 'मंदिर की स्थापना का वार्षिक उत्सव। [PLACEHOLDER: date & program details]' } },
    { date: null, type: 'special', tentative: true,
      title: { en: 'Community Seva Day', hi: 'सामुदायिक सेवा दिवस' },
      desc: { en: '[PLACEHOLDER: describe a volunteer or outreach event, or remove this entry]', hi: '[PLACEHOLDER: describe a volunteer or outreach event, or remove this entry]' } },
  ];

  /* Weekly programs by weekday (0 = Sunday). Used for the "Today" panel. */
  const WEEKLY = { 2: 'programs.ramayan', 5: 'programs.bhajans' };
  const DAY_KEYS = ['day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', 'day.saturday'];

  /* Temple hours (24h, Pacific time) */
  const HOURS = { open: 8, close: 20, timeZone: 'America/Los_Angeles' };

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  let currentLang = DEFAULT_LANG;

  function t(key, vars) {
    let str = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]);
    if (str == null) str = TRANSLATIONS[DEFAULT_LANG][key];
    if (str == null) return null;
    if (vars) Object.keys(vars).forEach((k) => { str = str.split(`{${k}}`).join(vars[k]); });
    return str;
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* Wraps any "[PLACEHOLDER…]" text in the visible placeholder style */
  function markPlaceholders(safeHTML) {
    return safeHTML.replace(/\[PLACEHOLDER[^\]]*\]/g, (m) => `<span class="placeholder">${m}</span>`);
  }

  function storageGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function storageSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* ignore */ } }

  /* Current date/time parts in the temple's time zone */
  function templeNow() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: HOURS.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short',
    }).formatToParts(new Date()).reduce((acc, p) => { acc[p.type] = p.value; return acc; }, {});
    const weekdays = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      isoDate: `${parts.year}-${parts.month}-${parts.day}`,
      hour: parseInt(parts.hour, 10),
      minute: parseInt(parts.minute, 10),
      weekday: weekdays[parts.weekday],
    };
  }

  function parseISODate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  /* ------------------------------------------------------------------------
     3. LANGUAGE SWITCHING
     ------------------------------------------------------------------------ */
  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    document.documentElement.lang = LANGUAGES[lang].htmlLang;

    $$('[data-i18n]').forEach((el) => {
      const val = t(el.dataset.i18n);
      if (val != null) el.textContent = val;
    });
    $$('[data-i18n-html]').forEach((el) => {
      const val = t(el.dataset.i18nHtml);
      if (val != null) el.innerHTML = val; // trusted strings from TRANSLATIONS only
    });
    $$('[data-i18n-aria]').forEach((el) => {
      const val = t(el.dataset.i18nAria);
      if (val != null) el.setAttribute('aria-label', val);
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      const val = t(el.dataset.i18nPlaceholder);
      if (val != null) el.setAttribute('placeholder', val);
    });

    $$('.lang-toggle').forEach((btn) => btn.setAttribute('aria-checked', String(lang !== DEFAULT_LANG)));
    storageSet(STORAGE_KEY, lang);
    document.dispatchEvent(new CustomEvent('temple:languagechange', { detail: { lang } }));
  }

  function initLanguage() {
    const codes = Object.keys(LANGUAGES);
    $$('.lang-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = codes[(codes.indexOf(currentLang) + 1) % codes.length];
        applyLanguage(next);
      });
    });
    const saved = storageGet(STORAGE_KEY);
    if (saved && saved !== DEFAULT_LANG && TRANSLATIONS[saved]) {
      applyLanguage(saved);
    } else {
      currentLang = DEFAULT_LANG;
    }
  }

  /* ------------------------------------------------------------------------
     4. HEADER, MOBILE MENU, SCROLL EFFECTS
     ------------------------------------------------------------------------ */
  function initHeader() {
    const header = $('#site-header');
    const nav = $('#main-nav');
    const toggle = $('.nav-toggle');
    const progress = $('.scroll-progress');
    const backToTop = $('.back-to-top');
    const mq = window.matchMedia('(max-width: 1024px)');

    function setMenuLabel() {
      if (!toggle) return;
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', t(open ? 'common.menuClose' : 'common.menu'));
    }

    function setMenu(open) {
      if (!nav || !toggle) return;
      if (open) nav.style.setProperty('--nav-top', `${Math.max(0, header.getBoundingClientRect().bottom)}px`);
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
      setMenuLabel();
      if (open) {
        const first = $('a', nav);
        if (first) setTimeout(() => first.focus(), 50);
      }
    }

    if (toggle && nav) {
      toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
      $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
          setMenu(false);
          toggle.focus();
        }
      });
      // Keep keyboard focus inside the open mobile menu (menu links + toggle)
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
        const focusables = [toggle, ...$$('a', nav)];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!focusables.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      const onChange = () => { if (!mq.matches) setMenu(false); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
    }

    document.addEventListener('temple:languagechange', setMenuLabel);

    let ticking = false;
    function onScroll() {
      const y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 10);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      if (backToTop) backToTop.classList.toggle('is-visible', y > 600);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const skip = $('.skip-link');
        if (skip) skip.focus({ preventScroll: true });
      });
    }

    $$('.js-year').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  /* ------------------------------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS
     ------------------------------------------------------------------------ */
  let revealObserver = null;
  function observeReveal(root = document) {
    const items = $$('[data-reveal]:not(.is-visible)', root);
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     6. TEMPLE HOURS, TODAY'S PROGRAM, WEEKLY SCHEDULE
     ------------------------------------------------------------------------ */
  function updateTodayInfo() {
    const now = templeNow();

    const status = $('#open-status');
    if (status) {
      const mins = now.hour * 60 + now.minute;
      const open = mins >= HOURS.open * 60 && mins < HOURS.close * 60;
      status.textContent = t(open ? 'ui.openNow' : 'ui.closedNow');
      status.classList.toggle('is-open', open);
      status.classList.toggle('is-closed', !open);
    }

    const dayEl = $('#today-day');
    const nameEl = $('#today-name');
    const noteEl = $('#today-note');
    if (dayEl && nameEl && noteEl) {
      dayEl.textContent = t('ui.todayIs', { day: t(DAY_KEYS[now.weekday]) });
      if (WEEKLY[now.weekday]) {
        nameEl.textContent = t(WEEKLY[now.weekday]);
        noteEl.innerHTML = markPlaceholders(escapeHTML(t('ui.programToday')));
      } else {
        nameEl.textContent = t('glance.defaultProgram');
        let next = 1;
        while (!WEEKLY[(now.weekday + next) % 7] && next < 7) next++;
        const nextDay = (now.weekday + next) % 7;
        noteEl.textContent = t('ui.nextProgram', { program: t(WEEKLY[nextDay]), day: t(DAY_KEYS[nextDay]) });
      }
    }

    $$('#week-grid .week-day').forEach((el) => {
      const isToday = Number(el.dataset.day) === now.weekday;
      el.classList.toggle('is-today', isToday);
      if (isToday) {
        el.setAttribute('data-today-label', t('ui.today'));
        el.setAttribute('aria-current', 'date');
      } else {
        el.removeAttribute('aria-current');
      }
    });
  }

  function initToday() {
    if (!$('#open-status') && !$('#today-name') && !$('#week-grid')) return;
    updateTodayInfo();
    setInterval(updateTodayInfo, 60 * 1000);
    document.addEventListener('temple:languagechange', updateTodayInfo);
  }

  /* ------------------------------------------------------------------------
     7. EVENTS RENDERING & FILTERS
     ------------------------------------------------------------------------ */
  const ICON_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>';
  const ICON_CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const ICON_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';

  function upcomingEvents(filter) {
    const today = templeNow().isoDate;
    return EVENTS
      .filter((e) => (filter === 'all' || !filter || e.type === filter))
      .filter((e) => e.date === null || e.date >= today)
      .sort((a, b) => {
        if (a.date === b.date) return 0;
        if (a.date === null) return 1;
        if (b.date === null) return -1;
        return a.date < b.date ? -1 : 1;
      });
  }

  function eventCard(ev, delay) {
    const locale = LANGUAGES[currentLang].locale;
    const title = escapeHTML(ev.title[currentLang] || ev.title.en);
    const desc = markPlaceholders(escapeHTML(ev.desc[currentLang] || ev.desc.en));
    const typeLabel = t(ev.type === 'festival' ? 'ui.festival' : 'ui.special');
    let badge;
    let dateText;
    if (ev.date) {
      const d = parseISODate(ev.date);
      badge = `<span class="m">${escapeHTML(d.toLocaleDateString(locale, { month: 'short' }))}</span>` +
        `<span class="d">${d.getDate()}</span>` +
        `<span class="w">${escapeHTML(d.toLocaleDateString(locale, { weekday: 'short' }))}</span>`;
      dateText = d.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      badge = `<span class="m">${escapeHTML(t('ui.tba'))}</span><span class="d">ॐ</span><span class="w">&nbsp;</span>`;
      dateText = t('ui.dateTBA');
    }
    const time = ev.time ? escapeHTML(ev.time[currentLang] || ev.time.en) : markPlaceholders(escapeHTML(t('ui.timeTBA')));
    const tentative = ev.tentative ? `<p class="event-meta">${markPlaceholders(escapeHTML(t('ui.tentative')))}</p>` : '';

    const pick = (field) => (field ? escapeHTML(field[currentLang] || field.en) : '');
    const todayTag = ev.date === templeNow().isoDate ? `<span class="tag tag--today">${escapeHTML(t('ui.today'))}</span>` : '';
    const highlights = ev.highlights ? `<p class="event-highlights">${pick(ev.highlights)}</p>` : '';
    const note = ev.note ? `<p class="event-note">${pick(ev.note)}</p>` : '';
    const phones = ev.phones && ev.phones.length
      ? `<p class="event-phones">${ev.phones.map((p) => `<a href="tel:+1${p.replace(/\D/g, '')}">${ICON_PHONE}${escapeHTML(p)}</a>`).join('')}</p>`
      : '';
    const body = `
        <span class="tag tag--${ev.type}">${escapeHTML(typeLabel)}</span>${todayTag}
        <h3>${title}</h3>
        <p class="event-meta"><span>${ICON_CAL}${escapeHTML(dateText)}</span><span>${ICON_CLOCK}${time}</span></p>
        ${tentative}
        <p>${desc}</p>
        ${highlights}${note}${phones}`;

    // Events with a flyer image (image: { src, full, alt }) get a larger, full-width card
    if (ev.image) {
      const hint = { en: 'Click to view the full flyer', hi: 'पूरा पोस्टर देखने के लिए क्लिक करें' };
      return `<article class="card card--hover event-card event-card--featured" data-reveal style="--reveal-delay:${delay}s">
      <div>
        <a class="event-flyer" href="${escapeHTML(ev.image.full || ev.image.src)}" target="_blank" rel="noopener">
          <img src="${escapeHTML(ev.image.src)}" width="700" height="906" loading="lazy" decoding="async" alt="${pick(ev.image.alt)}">
        </a>
        <span class="event-flyer-hint">${escapeHTML(hint[currentLang] || hint.en)}</span>
      </div>
      <div class="event-body">
        <div class="event-head"><div class="event-date" aria-hidden="true">${badge}</div><div>${body}</div></div>
      </div>
    </article>`;
    }

    return `<article class="card card--hover event-card" data-reveal style="--reveal-delay:${delay}s">
      <div class="event-date" aria-hidden="true">${badge}</div>
      <div class="event-body">${body}
      </div>
    </article>`;
  }

  function renderHomeEvents() {
    const el = $('#home-events');
    if (!el) return;
    const limit = parseInt(el.dataset.limit, 10) || 4;
    const list = upcomingEvents('festival').filter((e) => e.date).slice(0, limit);
    el.innerHTML = list.length
      ? list.map((ev, i) => eventCard(ev, (i * 0.08).toFixed(2))).join('')
      : `<p class="events-empty">${escapeHTML(t('ui.noEvents'))}</p>`;
    observeReveal(el);
  }

  let eventFilter = 'all';
  function renderEventsPage() {
    const el = $('#events-list');
    if (!el) return;
    const list = upcomingEvents(eventFilter);
    if (!list.length) {
      el.innerHTML = `<p class="events-empty">${escapeHTML(t('ui.noEvents'))}</p>`;
      return;
    }
    const locale = LANGUAGES[currentLang].locale;
    const groups = new Map();
    list.forEach((ev) => {
      const key = ev.date ? ev.date.slice(0, 7) : 'tba';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(ev);
    });
    let html = '';
    groups.forEach((events, key) => {
      const heading = key === 'tba'
        ? t('ui.dateTBA')
        : parseISODate(`${key}-01`).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
      html += `<section class="event-month" aria-label="${escapeHTML(heading)}">
        <h3 class="event-month-title">${escapeHTML(heading)}</h3>
        <div class="event-grid">${events.map((ev, i) => eventCard(ev, (i * 0.08).toFixed(2))).join('')}</div>
      </section>`;
    });
    el.innerHTML = html;
    observeReveal(el);
  }

  function initEvents() {
    renderHomeEvents();
    renderEventsPage();
    $$('[data-event-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        eventFilter = btn.dataset.eventFilter;
        $$('[data-event-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        renderEventsPage();
      });
    });
    document.addEventListener('temple:languagechange', () => { renderHomeEvents(); renderEventsPage(); });
  }

  /* ------------------------------------------------------------------------
     8. GALLERY FILTERS & LIGHTBOX
     ------------------------------------------------------------------------ */
  function initGallery() {
    const grid = $('#gallery-grid');
    if (!grid) return;
    const items = $$('.gallery-item', grid);

    $$('[data-gallery-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.galleryFilter;
        $$('[data-gallery-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        items.forEach((item) => {
          item.hidden = !(f === 'all' || item.dataset.category === f);
          if (!item.hidden) item.classList.add('is-visible');
        });
      });
    });

    const box = $('#lightbox');
    if (!box) return;
    const img = $('.lightbox-img', box);
    const titleEl = $('.lightbox-title', box);
    const countEl = $('.lightbox-count', box);
    const btnClose = $('.lightbox-close', box);
    const btnPrev = $('.lightbox-prev', box);
    const btnNext = $('.lightbox-next', box);
    let visible = [];
    let index = 0;
    let lastFocus = null;

    function show(i) {
      index = (i + visible.length) % visible.length;
      const item = visible[index];
      const thumb = $('img', item);
      img.src = item.dataset.full || thumb.src;
      img.alt = thumb.alt;
      titleEl.textContent = $('.gallery-caption', item).textContent;
      countEl.textContent = t('ui.imageCount', { n: index + 1, total: visible.length });
      // Preload neighbours for snappy navigation
      [index - 1, index + 1].forEach((n) => {
        const neighbour = visible[(n + visible.length) % visible.length];
        if (neighbour) { const pre = new Image(); pre.src = neighbour.dataset.full || $('img', neighbour).src; }
      });
    }

    function open(item) {
      visible = items.filter((it) => !it.hidden);
      lastFocus = document.activeElement;
      show(visible.indexOf(item));
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      // Wait for the visibility transition to start so the button is focusable
      setTimeout(() => btnClose.focus(), 60);
    }

    function close() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    }

    items.forEach((item) => item.addEventListener('click', () => open(item)));
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => show(index - 1));
    btnNext.addEventListener('click', () => show(index + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });

    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
      else if (e.key === 'Tab') {
        const f = [btnClose, btnPrev, btnNext];
        const pos = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(pos + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    let touchX = null;
    box.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      touchX = null;
    });

    document.addEventListener('temple:languagechange', () => { if (box.classList.contains('is-open')) show(index); });
  }

  /* ------------------------------------------------------------------------
     Form validation helpers (shared by donate + contact)
     ------------------------------------------------------------------------ */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setFieldError(input, messageKey) {
    const field = input.closest('.field');
    const errorEl = document.getElementById(`${input.id}-error`);
    const msg = messageKey ? t(messageKey) : '';
    if (field) field.classList.toggle('has-error', Boolean(messageKey));
    if (errorEl) errorEl.textContent = msg;
    input.setAttribute('aria-invalid', messageKey ? 'true' : 'false');
    return !messageKey;
  }

  function validateRequired(input, isEmail) {
    const value = input.value.trim();
    if (!value) return setFieldError(input, 'ui.errRequired');
    if (isEmail && !EMAIL_RE.test(value)) return setFieldError(input, 'ui.errEmail');
    return setFieldError(input, null);
  }

  function showStatus(el, type, html) {
    el.hidden = false;
    el.className = `form-status is-${type}`;
    el.innerHTML = html;
  }

  /* ------------------------------------------------------------------------
     9. DONATION FORM
     ------------------------------------------------------------------------
     ⚠️  PAYMENT INTEGRATION POINT
     No payment is processed by this site today. PaymentGateway.startCheckout()
     receives a clean `donation` object — replace its body with a real provider.

     ── Option A: Stripe Checkout (recommended) ────────────────────────────────
     1. Create a small server endpoint (e.g. Netlify/Vercel/Cloudflare function,
        or your own Node/PHP server) at POST /api/create-checkout-session.
        It uses your SECRET key (sk_live_…) — NEVER put the secret key in this file.
          const session = await stripe.checkout.sessions.create({
            mode: donation.frequency === 'monthly' ? 'subscription' : 'payment',
            line_items: [{ price_data: { currency: 'usd', unit_amount: donation.amount * 100,
                           product_data: { name: 'Donation — ' + donation.purpose },
                           ...(donation.frequency === 'monthly' && { recurring: { interval: 'month' } }) },
                           quantity: 1 }],
            customer_email: donation.email,
            metadata: { dedication: donation.dedication, anonymous: String(donation.anonymous) },
            success_url: 'https://YOUR-DOMAIN/donate.html?thanks=1',
            cancel_url:  'https://YOUR-DOMAIN/donate.html',
          });
          return { url: session.url };
     2. In startCheckout below:
          const res = await fetch('/api/create-checkout-session', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donation) });
          const { url } = await res.json();
          window.location.href = url;
          return { status: 'redirecting' };
        (Stripe's publishable key pk_live_… is only needed if you use Stripe.js
         Elements instead of hosted Checkout.)

     ── Option B: PayPal ───────────────────────────────────────────────────────
     1. Add to donate.html:  <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>
        (client-id is public; keep the PayPal secret on a server.)
     2. Render paypal.Buttons({ createOrder, onApprove }).render('#paypal-buttons')
        using donation.amount, or create the order server-side for better security.
     ------------------------------------------------------------------------ */
  const PaymentGateway = {
    provider: 'none', // 'stripe' | 'paypal' once integrated

    async startCheckout(donation) {
      // TODO: Replace with a real provider (see instructions above).
      // Intentionally does NOT simulate a successful payment.
      void donation;
      return { status: 'not-configured' };
    },
  };

  function initDonationForm() {
    const form = $('#donation-form');
    if (!form) return;
    const customField = $('#custom-amount-field');
    const customInput = $('#custom-amount');
    const totalEl = $('#donation-total');
    const freqEl = $('#donation-frequency');
    const statusEl = $('#donation-status');
    const nameInput = $('#donor-name');
    const emailInput = $('#donor-email');
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 0 });

    function getAmount() {
      const tier = form.querySelector('input[name="tier"]:checked');
      if (!tier) return 0;
      if (tier.value === 'custom') return Math.round((parseFloat(customInput.value) || 0) * 100) / 100;
      return Number(tier.value);
    }

    function getFrequency() {
      const f = form.querySelector('input[name="frequency"]:checked');
      return f ? f.value : 'one-time';
    }

    function updateSummary() {
      const isCustom = form.querySelector('input[name="tier"]:checked')?.value === 'custom';
      customField.hidden = !isCustom;
      const amount = getAmount();
      totalEl.textContent = amount > 0 ? currency.format(amount) : '—';
      freqEl.textContent = t(getFrequency() === 'monthly' ? 'donate.form.monthly' : 'donate.form.once');
    }

    form.addEventListener('change', (e) => {
      updateSummary();
      if (e.target.name === 'tier' && e.target.value === 'custom') customInput.focus();
    });
    customInput.addEventListener('input', updateSummary);
    nameInput.addEventListener('blur', () => nameInput.value && validateRequired(nameInput));
    emailInput.addEventListener('blur', () => emailInput.value && validateRequired(emailInput, true));
    document.addEventListener('temple:languagechange', updateSummary);
    updateSummary();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = getAmount();
      const isCustom = form.querySelector('input[name="tier"]:checked')?.value === 'custom';
      let ok = true;
      if (isCustom) ok = setFieldError(customInput, amount >= 1 ? null : 'ui.errAmount') && ok;
      ok = validateRequired(nameInput) && ok;
      ok = validateRequired(emailInput, true) && ok;

      if (!ok) {
        showStatus(statusEl, 'error', escapeHTML(t('ui.errForm')));
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const donation = {
        amount,
        currency: 'USD',
        frequency: getFrequency(),
        purpose: $('#purpose').value,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        dedication: $('#dedication').value.trim(),
        anonymous: $('#anonymous').checked,
        language: currentLang,
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      try {
        const result = await PaymentGateway.startCheckout(donation);
        if (result.status === 'redirecting') {
          showStatus(statusEl, 'info', escapeHTML(t('ui.payRedirecting')));
        } else {
          showStatus(statusEl, 'info', markPlaceholders(escapeHTML(t('ui.payNotConfigured'))));
        }
      } catch (err) {
        console.error('Checkout error:', err);
        showStatus(statusEl, 'error', escapeHTML(t('ui.payError')));
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. CONTACT FORM
     ------------------------------------------------------------------------
     ⚠️  FORM BACKEND INTEGRATION POINT
     Messages are NOT sent anywhere today. Set ContactFormHandler.endpoint to a
     service that accepts POSTed form data, e.g.:
       • Formspree:  endpoint = 'https://formspree.io/f/YOUR_FORM_ID'
       • Basin / Getform / FormSubmit — similar hosted endpoints
       • Netlify Forms: add  data-netlify="true" name="contact"  to the <form>
         and remove the preventDefault submit handling for a no-JS post
       • Your own server/function that emails the committee (e.g. via SendGrid,
         Mailgun, Amazon SES). Keep any API keys on the server, never in this file.
     ------------------------------------------------------------------------ */
  const ContactFormHandler = {
    endpoint: '', // e.g. 'https://formspree.io/f/xxxxxxx'

    async send(data) {
      if (!this.endpoint) return { status: 'not-configured' };
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      return { status: 'sent' };
    },
  };

  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const statusEl = $('#contact-status');
    const name = $('#c-name');
    const email = $('#c-email');
    const message = $('#c-message');

    // Pre-select the subject from the URL, e.g. contact.html?subject=volunteer
    const subjectParam = new URLSearchParams(window.location.search).get('subject');
    const subjectSelect = $('#c-subject');
    if (subjectParam && window.CSS && subjectSelect.querySelector(`option[value="${CSS.escape(subjectParam)}"]`)) {
      subjectSelect.value = subjectParam;
    }

    name.addEventListener('blur', () => name.value && validateRequired(name));
    email.addEventListener('blur', () => email.value && validateRequired(email, true));
    message.addEventListener('blur', () => message.value && validateRequired(message));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let ok = validateRequired(name);
      ok = validateRequired(email, true) && ok;
      ok = validateRequired(message) && ok;
      if (!ok) {
        showStatus(statusEl, 'error', escapeHTML(t('ui.errForm')));
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: $('#c-phone').value.trim(),
        subject: $('#c-subject').value,
        message: message.value.trim(),
        language: currentLang,
      };

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      showStatus(statusEl, 'info', escapeHTML(t('ui.contactSending')));
      try {
        const result = await ContactFormHandler.send(data);
        if (result.status === 'sent') {
          showStatus(statusEl, 'success', escapeHTML(t('ui.contactSuccess')));
          form.reset();
        } else {
          showStatus(statusEl, 'info', markPlaceholders(escapeHTML(t('ui.contactNotConfigured', { name: data.name }))));
        }
      } catch (err) {
        console.error('Contact form error:', err);
        showStatus(statusEl, 'error', escapeHTML(t('ui.contactError')));
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------------
     INIT
     ------------------------------------------------------------------------ */
  function init() {
    initHeader();
    initToday();
    initEvents();
    initGallery();
    initDonationForm();
    initContactForm();
    initLanguage();   // after components so they re-render in the saved language
    observeReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
