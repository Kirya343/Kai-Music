import { Link } from "react-router-dom";

/* const HomePage = () => {
    return (
        <div className={styles.page}>
            <Link to={"/app"} className={styles.link}>I NEED MUSIC</Link>
        </div>
    )
}
 */
import styles from "./HomePage.module.scss";
import clsx from "clsx";
import Logo from "@/components/ui/Logo/Logo";
import { ArrowIcon, DiscIcon, LeftIcon, MusicNoteIcon, PauseIcon, PlaylistIcon, RightIcon } from "@/assets/icons";

const features = [
    {
        icon: <MusicNoteIcon />,
        title: "Your music library",
        description:
            "Upload your favorite tracks and keep your entire music collection in one place. Your music, always accessible.",
        number: "01",
    },
    {
        icon: <PlaylistIcon />,
        title: "Personal playlists",
        description:
            "Create playlists, organize your favorite tracks and build the perfect soundtrack for every moment.",
        number: "02",
    },
    {
        icon: <DiscIcon />,
        title: "Listening rooms",
        description:
            "Create a room, invite your friends and listen to music together in real time, wherever you are.",
        number: "03",
    },
    {
        icon: <ArrowIcon direction="right" />,
        title: "Your music, your way",
        description:
            "Enjoy a seamless listening experience with synchronized playback and intuitive controls.",
        number: "04",
    },
];

const steps = [
    {
        number: "01",
        title: "Create your library",
        description:
            "Upload your favorite music and build your personal collection.",
    },
    {
        number: "02",
        title: "Make it yours",
        description:
            "Organize your tracks into playlists and discover your own way to listen.",
    },
    {
        number: "03",
        title: "Listen together",
        description:
            "Create a listening room and share your music experience with friends.",
    },
];

function Equalizer() {
    return (
        <div className={styles.equalizer} aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
                <span
                    key={index}
                    style={{
                        "--bar-height": `${20 + ((index * 17) % 65)}%`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

export default function HomePage() {
    return (
        <>

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.eyebrow}>
                        <span className={styles.statusDot} />
                        YOUR MUSIC. YOUR SPACE.
                    </div>

                    <h1>
                        Music sounds
                        <br />
                        better <span>together.</span>
                    </h1>

                    <p className={styles.heroDescription}>
                        A place for your music. Build your library, create
                        playlists and share the experience with people
                        you love listening with.
                    </p>

                    <div className={styles.heroActions}>
                        <Link to="/app/library" className={styles.primaryButton}>
                            Start listening
                            <span aria-hidden="true"><ArrowIcon direction="right" /></span>
                        </Link>

                        <a href="#features" className={styles.secondaryButton}>
                            Explore features
                        </a>
                    </div>

                    <div className={styles.heroNote}>
                        <span className={styles.heroNoteIcon}><MusicNoteIcon /></span>
                        Your personal music experience.
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={clsx(styles.orbit, styles.orbitOne)} />
                    <div className={clsx(styles.orbit, styles.orbitTwo)} />

                    <div className={styles.playerCard}>
                        <div className={styles.playerTop}>
                            <span>NOW PLAYING</span>
                            <span className={styles.liveIndicator}>
                                <i />
                                LIVE
                            </span>
                        </div>

                        <div className={styles.albumArtwork}>
                            <div className={styles.artworkCircle} />
                            <span>KM</span>
                            <div className={styles.artworkLabel}>
                                KAI MUSIC
                            </div>
                        </div>

                        <div className={styles.trackInfo}>
                            <div>
                                <h3>Your next favorite</h3>
                                <p>Discover your sound</p>
                            </div>
                            <span className={styles.trackIcon}><MusicNoteIcon /></span>
                        </div>

                        <Equalizer />

                        <div className={styles.progressTrack}>
                            <span />
                        </div>

                        <div className={styles.playerControls}>
                            <span>02:34</span>
                            <div className={styles.controlButtons}>
                                <LeftIcon />
                                <span className={styles.playButton}><PauseIcon /></span>
                                <RightIcon />
                            </div>
                            <span>04:12</span>
                        </div>
                    </div>

                    <div className={`${styles.floatingCard} ${styles.libraryFloat}`}>
                        <span className={styles.floatIcon}>♫</span>
                        <div>
                            <strong>Your library</strong>
                            <small>Your music collection</small>
                        </div>
                    </div>

                    <div className={`${styles.floatingCard} ${styles.roomFloat}`}>
                        <div className={styles.avatarStack}>
                            <span>K</span>
                            <span>M</span>
                            <span>+</span>
                        </div>
                        <div>
                            <strong>Listening together</strong>
                            <small>Music connects people</small>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.intro}>
                <div className={styles.introLine} />
                <p>
                    Everything you need to enjoy music.
                    <span> Nothing you don't.</span>
                </p>
                <div className={styles.introLine} />
            </section>

            <section id="features" className={styles.featuresSection}>
                <div className={styles.sectionHeading}>
                    <div>
                        <span className={styles.sectionLabel}>
                            WHAT IS KAI MUSIC?
                        </span>
                        <h2>
                            Your music.
                            <br />
                            <span>Your experience.</span>
                        </h2>
                    </div>

                    <p>
                        More than just a music player. A space where your
                        collection, playlists and shared listening experience
                        come together.
                    </p>
                </div>

                <div className={styles.featuresGrid}>
                    {features.map((feature) => (
                        <article key={feature.number} className={styles.featureCard}>
                            <div className={styles.featureTop}>
                                <span className={styles.featureIcon}>
                                    {feature.icon}
                                </span>
                                <span className={styles.featureNumber}>
                                    / {feature.number}
                                </span>
                            </div>

                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>

                            <span className={styles.featureArrow}><ArrowIcon direction="right" /></span>
                        </article>
                    ))}
                </div>
            </section>

            <section id="rooms" className={styles.roomsSection}>
                <div className={styles.roomVisual}>
                    <div className={styles.roomGlow} />

                    <div className={styles.roomWindow}>
                        <div className={styles.roomWindowHeader}>
                            <div>
                                <span className={styles.roomStatus} />
                                LISTENING ROOM
                            </div>
                            <span>•••</span>
                        </div>

                        <div className={styles.roomArtwork}>
                            <MusicNoteIcon />
                        </div>

                        <h3>Music brings us together.</h3>
                        <p>Shared listening experience</p>

                        <div className={styles.roomMembers}>
                            <div className={styles.memberAvatars}>
                                <span>K</span>
                                <span>M</span>
                                <span>A</span>
                                <span>+</span>
                            </div>
                            <span>Listening together</span>
                        </div>

                        <div className={styles.roomWave}>
                            {Array.from({ length: 32 }, (_, index) => (
                                <span
                                    key={index}
                                    style={{
                                        "--wave-height": `${15 + ((index * 23) % 75)}%`,
                                    } as React.CSSProperties}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.roomContent}>
                    <span className={styles.sectionLabel}>
                        LISTEN TOGETHER
                    </span>

                    <h2>
                        Good music
                        <br />
                        is better <span>shared.</span>
                    </h2>

                    <p>
                        Music is more than something you listen to. It is
                        something you experience together.
                    </p>

                    <p>
                        Create your own listening room, invite your friends
                        and enjoy synchronized playback. Everyone stays
                        on the same track, at the same moment.
                    </p>

                    <ul className={styles.roomBenefits}>
                        <li>
                            <span>✓</span>
                            Create and join listening rooms
                        </li>
                        <li>
                            <span>✓</span>
                            Synchronized playback
                        </li>
                        <li>
                            <span>✓</span>
                            Shared music experience
                        </li>
                    </ul>

                    <Link to="/app/library" className={styles.primaryButton}>
                        Explore Kai Music
                        <ArrowIcon direction="right" />
                    </Link>
                </div>
            </section>

            <section className={styles.philosophySection}>
                <span className={styles.sectionLabel}>BUILT AROUND MUSIC</span>
                <h2>
                    Your collection.
                    <br />
                    Your playlists.
                    <br />
                    <span>Your people.</span>
                </h2>
                <p>
                    A simple idea: make enjoying your music and sharing it
                    with others a better experience.
                </p>
            </section>

            <section id="how-it-works" className={styles.stepsSection}>
                <div className={styles.sectionHeading}>
                    <div>
                        <span className={styles.sectionLabel}>
                            GETTING STARTED
                        </span>
                        <h2>
                            Three steps.
                            <br />
                            <span>One experience.</span>
                        </h2>
                    </div>

                    <p>
                        Getting started with Kai Music is simple.
                        Bring your music and make it yours.
                    </p>
                </div>

                <div className={styles.stepsGrid}>
                    {steps.map((step) => (
                        <article key={step.number} className={styles.stepCard}>
                            <span>{step.number}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.ctaCard}>
                    <div className={styles.ctaGlow} />

                    <span className={styles.sectionLabel}>
                        YOUR MUSIC STARTS HERE
                    </span>

                    <h2>
                        Ready to find
                        <br />
                        your <span>sound?</span>
                    </h2>

                    <p>
                        Your music is waiting. Start building your own
                        listening experience with Kai Music.
                    </p>

                    <Link to="/app/library" className={styles.primaryButton}>
                        Open Kai Music
                        <ArrowIcon direction="right" />
                    </Link>
                </div>
            </section>

            <footer className={styles.footer}>
                <Logo />

                <span className={styles.footerText}>
                    Made for the love of music.
                </span>

                <span className={styles.copyright}>
                    © {new Date().getFullYear()} Kai Music
                </span>
            </footer>
        </>
    );
}