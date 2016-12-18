package io.pageobject.generator;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class PageObjectGeneratorGui {

    public static void main(String[] args) {

        final JTextArea inputText = new JTextArea();
        final JTextArea outputText = new JTextArea();
        final JTextField pageName = new JTextField();

        JPanel centerPanel = new JPanel();
        centerPanel.setLayout(new GridBagLayout());

        GridBagConstraints constraints = new GridBagConstraints();
        constraints.fill = GridBagConstraints.BOTH;
        constraints.weightx = 1.0;
        constraints.weighty = 0.5;
        constraints.gridy = 0;
        centerPanel.add(new JScrollPane(inputText), constraints);
        constraints.gridy = 1;
        centerPanel.add(new JScrollPane(outputText), constraints);

        JButton generateButton = new JButton("Generate");
        generateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent event) {
                String input = inputText.getText();
                PageObjectGenerator generator = new PageObjectGenerator(ApplicationType.ANGULAR1);
                String result = null;
                try {
                    result = generator.runWithStringInput(input, pageName.getText());
                } catch (Exception exception) {
                    System.err.println("Failed to generate page object: " + exception.getMessage());
                }
                outputText.setText(result);
            }
        });

        JFrame frame = new JFrame("Page Object Generator");
        frame.setPreferredSize(new Dimension(1024, 860));
        frame.getContentPane().add(BorderLayout.NORTH, pageName);
        frame.getContentPane().add(BorderLayout.CENTER, centerPanel);
        frame.getContentPane().add(BorderLayout.SOUTH, generateButton);

        frame.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });

        frame.pack();
        frame.setVisible(true);
    }

}
