import service from "./service";
import { transaction, generateAccess } from "../../../utils/index.js";
import { startSession, ClientSession } from "mongoose";
import { Request, Response } from "express";
import { EVENT } from "../../../constants";

const getAll = async (_req: Request, _res: Response) => {
  const find = _req.query.find ? JSON.parse(_req.query.find?.toString()) : {};
  const data = await service.getAll({ find });
  _res.send({
    data,
    status: "success",
    message: "Get message success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const data = await service.getById(id);
  _res.send({
    data,
    status: "success",
    message: "Get message success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const add = async (_req: any, _res: Response) => {
  const session: ClientSession = await startSession();
  _res.send(
    await transaction(
      session,
      async () => {
        const data = await service.add({ ..._req.body }, session);
        _req.io.emit(`${EVENT.CREATED_MESSAGE}/${data[0]?._id}`, {
          data,
        });
        return data;
      },
      "Create message"
    )
  );
};

const update = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  const { id } = _req.params;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.update({ _id: id }, _req.body, session);
      },
      "Update message"
    )
  );
};

const removeOne = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();

  const { id } = _req.params;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.removeOne({ _id: id }, session);
      },
      "Delete message"
    )
  );
};

export { getAll, getById, add, update, removeOne };
