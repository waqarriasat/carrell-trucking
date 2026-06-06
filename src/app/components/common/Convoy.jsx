// src/app/components/common/Convoy.jsx
"use client";

import React from 'react';
import styles from './Convoy.module.css';

export default function Convoy() {
    const Wheels = () => (
        <>
            <div className={`${styles.wheel} ${styles.frontWheel}`}><div className={styles.rimDetail}></div></div>
            <div className={`${styles.wheel} ${styles.backWheel1}`}><div className={styles.rimDetail}></div></div>
            <div className={`${styles.wheel} ${styles.backWheel2}`}><div className={styles.rimDetail}></div></div>
        </>
    );

    return (
        <div className={styles.animationContainer}>
            <div className={styles.convoyStream}>

                {/* 1. REEFER UNIT */}
                <div className={`${styles.ardmoreVehicle} ${styles.reeferUnit}`}>
                    <div className={styles.truckBody}>
                        <div className={styles.cabin}><div className={styles.window}></div></div>
                        <div className={`${styles.trailer} ${styles.reeferBox}`}>
                            <div className={styles.coolingMotor}></div>
                            <div className={styles.brandingArea}>
                                <h2>Ardmore</h2>
                                <p>REEFER LOGISTICS</p>
                            </div>
                        </div>
                    </div>
                    <Wheels />
                </div>

                {/* 2. SHIPPING CONTAINER */}
                <div className={`${styles.ardmoreVehicle} ${styles.containerUnit}`}>
                    <div className={styles.truckBody}>
                        <div className={styles.cabin}><div className={styles.window}></div></div>
                        <div className={`${styles.trailer} ${styles.shippingContainer}`}>
                            <div className={styles.containerGrooves}></div>
                            <div className={`${styles.brandingArea} ${styles.containerLabel}`}>
                                <h2>Ardmore</h2>
                                <p>CONTAINER LINE</p>
                            </div>
                        </div>
                    </div>
                    <Wheels />
                </div>

                {/* 3. STANDARD CARGO TRAILER */}
                <div className={`${styles.ardmoreVehicle} ${styles.standardTrailerUnit}`}>
                    <div className={styles.truckBody}>
                        <div className={styles.cabin}><div className={styles.window}></div></div>
                        <div className={`${styles.trailer} ${styles.cargoBox}`}>
                            <div className={styles.brandingArea}>
                                <h2>Ardmore</h2>
                                <p>TRAILER Inc</p>
                            </div>
                        </div>
                    </div>
                    <Wheels />
                </div>

                {/* 4. EMPTY FLATBED TRAILER */}
                <div className={`${styles.ardmoreVehicle} ${styles.emptyFlatbedUnit}`}>
                    <div className={styles.truckBody}>
                        <div className={styles.cabin}><div className={styles.window}></div></div>
                        <div className={`${styles.trailer} ${styles.flatbedChassis}`}>
                            <div className={styles.hitchNeck}></div>
                            <div className={styles.rearMudguard}></div>

                            {/* Text perfectly centered directly onto the steel flatbed frame */}
                            <div className={styles.flatbedText}>
                                <h2>Ardmore</h2>
                                <p>TRAILER FLATBED</p>
                            </div>
                        </div>
                    </div>
                    <Wheels />
                </div>

            </div>
            <div className={styles.roadTrack}></div>
        </div>
    );
}