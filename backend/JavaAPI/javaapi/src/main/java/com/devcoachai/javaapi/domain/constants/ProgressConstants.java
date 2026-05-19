package com.devcoachai.javaapi.domain.constants;

public class ProgressConstants {
    public static final double STARTING_THRESHOLD = 30.0;
    public static final double IN_PROGRESS_THRESHOLD = 70.0;
    public static final double COMPLETED_THRESHOLD = 100.0;
    public static final int MAX_HARD_TASKS_BEFORE_SUGGESTION = 3;
    public static final String UNRATED = "UNRATED";
    public static final String STATUS_COMPLETED = "COMPLETED";
    public static final String STATUS_ALMOST_DONE = "ALMOST_DONE";
    public static final String STATUS_IN_PROGRESS = "IN_PROGRESS";
    public static final String STATUS_STARTING = "STARTING";

    private ProgressConstants() {}
}
