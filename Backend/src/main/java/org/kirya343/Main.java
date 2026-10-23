package org.kirya343;

import org.kirya343.kai.KaiApplication;
import org.kirya343.terminal.runtime.TerminalRuntime;

public class Main {

	public static void main(String[] args) {

		System.out.println("Main class: " + Main.class.getProtectionDomain()
        	.getCodeSource().getLocation());

		System.out.println("ClassLoader: " + Main.class.getClassLoader());

		TerminalRuntime.launch(KaiApplication.class, args);
	}

}
