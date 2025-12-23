import {
  BadRequestWithMessage,
  INTERNAL_SERVER_ERROR_SERVICE_RESPONSE,
} from "$entities/Service";
import Logger from "$pkg/logger";
import { signToken } from "$utils/jwt";
import { prisma } from "$utils/prisma.utils";
import bcrypt from "bcrypt";

export async function registerUser(
  email: string,
  password: string,
  name?: string
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return BadRequestWithMessage("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name || "",
      },
    });

    return {
      status: true,
      data: user,
    };
  } catch (error) {
    Logger.error(`ExampleService.get : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return BadRequestWithMessage("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return BadRequestWithMessage("Invalid email or password");
    }

    const token = signToken({ userId: user.id });

    return {
      status: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    };
  } catch (error) {
    Logger.error(`ExampleService.get : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
