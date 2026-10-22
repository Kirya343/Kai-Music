package org.kirya343;

import java.io.File;

import org.kirya343.kai.KaiApplication;
import org.kirya343.terminal.runtime.TerminalRuntime;

public class Main {

	public static void main(String[] args) {
		System.out.println("Working directory: " + System.getProperty("user.dir"));
		System.out.println("Config exists: " +
        	new File("config/database.yml").exists());

		TerminalRuntime.launch(KaiApplication.class, args);
	}

}
